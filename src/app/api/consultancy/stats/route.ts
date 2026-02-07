import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2026-01-28.clover" })
  : null;

const priceIds = {
  initial: process.env.STRIPE_PRICE_INITIAL,
  subscription: process.env.STRIPE_PRICE_SUBSCRIPTION,
  tenMinute: process.env.STRIPE_PRICE_TEN_MINUTE,
};

const emptyCounts = {
  initial: 0,
  subscription: 0,
  tenMinute: 0,
};

type PaidCounts = typeof emptyCounts;

const addLineItems = (
  counts: PaidCounts,
  lineItems: Stripe.LineItem[] | undefined,
) => {
  if (!lineItems) return;
  for (const item of lineItems) {
    const priceId = item.price?.id;
    const quantity = item.quantity ?? 1;
    if (priceId && priceId === priceIds.initial) {
      counts.initial += quantity;
    } else if (priceId && priceId === priceIds.subscription) {
      counts.subscription += quantity;
    } else if (priceId && priceId === priceIds.tenMinute) {
      counts.tenMinute += quantity;
    }
  }
};

const DEBUG_SESSION_LIMIT = 5;

type DebugSession = {
  id: string;
  payment_status: Stripe.Checkout.Session.PaymentStatus | null;
  line_items: Array<{ price_id: string | null; quantity: number }>;
};

const fetchPaidCounts = async (
  withDebug = false,
): Promise<{ counts: PaidCounts; debugSessions?: DebugSession[] }> => {
  if (!stripe) return { counts: { ...emptyCounts } };

  const counts: PaidCounts = { ...emptyCounts };
  const debugSessions: DebugSession[] | undefined = withDebug ? [] : undefined;
  let startingAfter: string | undefined;

  do {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      starting_after: startingAfter,
      status: "complete",
      expand: ["data.line_items"],
    });

    for (const session of sessions.data) {
      if (debugSessions && debugSessions.length < DEBUG_SESSION_LIMIT) {
        debugSessions.push({
          id: session.id,
          payment_status: session.payment_status ?? null,
          line_items:
            session.line_items?.data?.map((item) => ({
              price_id: item.price?.id ?? null,
              quantity: item.quantity ?? 1,
            })) ?? [],
        });
      }
      if (session.payment_status !== "paid") {
        continue;
      }
      if (session.line_items?.data?.length) {
        addLineItems(counts, session.line_items.data);
        continue;
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 },
      );
      if (debugSessions && debugSessions.length < DEBUG_SESSION_LIMIT) {
        debugSessions.push({
          id: session.id,
          payment_status: session.payment_status ?? null,
          line_items: lineItems.data.map((item) => ({
            price_id: item.price?.id ?? null,
            quantity: item.quantity ?? 1,
          })),
        });
      }
      addLineItems(counts, lineItems.data);
    }

    if (!sessions.has_more || sessions.data.length === 0) {
      startingAfter = undefined;
    } else {
      startingAfter = sessions.data[sessions.data.length - 1]?.id;
    }
  } while (startingAfter);

  return { counts, debugSessions };
};

export async function GET(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      {
        services: {
          initial: { paid: 0, completed: 0 },
          subscription: { paid: 0, completed: 0 },
          tenMinute: { paid: 0, completed: 0 },
        },
        error: "Missing STRIPE_SECRET_KEY",
      },
      { status: 500 },
    );
  }

  const { counts: paidCounts, debugSessions } = await fetchPaidCounts(
    new URL(request.url).searchParams.get("debug") === "1",
  );

  return NextResponse.json({
    services: {
      initial: { paid: paidCounts.initial, completed: 0 },
      subscription: { paid: paidCounts.subscription, completed: 0 },
      tenMinute: { paid: paidCounts.tenMinute, completed: 0 },
    },
    updatedAt: new Date().toISOString(),
    ...(debugSessions
      ? {
          debug: {
            priceIds,
            sessions: debugSessions,
          },
        }
      : {}),
  });
}
