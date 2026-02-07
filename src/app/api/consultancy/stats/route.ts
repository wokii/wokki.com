import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" })
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

const fetchPaidCounts = async (): Promise<PaidCounts> => {
  if (!stripe) return { ...emptyCounts };

  const counts: PaidCounts = { ...emptyCounts };
  let startingAfter: string | undefined;

  do {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      starting_after: startingAfter,
      status: "complete",
      payment_status: "paid",
      expand: ["data.line_items"],
    });

    for (const session of sessions.data) {
      if (session.line_items?.data?.length) {
        addLineItems(counts, session.line_items.data);
        continue;
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 },
      );
      addLineItems(counts, lineItems.data);
    }

    if (!sessions.has_more || sessions.data.length === 0) {
      startingAfter = undefined;
    } else {
      startingAfter = sessions.data[sessions.data.length - 1]?.id;
    }
  } while (startingAfter);

  return counts;
};

export async function GET() {
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

  const paidCounts = await fetchPaidCounts();

  return NextResponse.json({
    services: {
      initial: { paid: paidCounts.initial, completed: 0 },
      subscription: { paid: paidCounts.subscription, completed: 0 },
      tenMinute: { paid: paidCounts.tenMinute, completed: 0 },
    },
    updatedAt: new Date().toISOString(),
  });
}
