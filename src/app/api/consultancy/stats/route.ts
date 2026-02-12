import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2026-01-28.clover" })
  : null;

const initialPaymentLinkUrl =
  process.env.STRIPE_INITIAL_PAYMENT_LINK_URL ??
  "https://pay.wokki.com/b/9B6cN6gszgxxbqV5ZK3Je04";

const serviceConfig = {
  initial: { priceId: process.env.STRIPE_PRICE_INITIAL ?? null },
  subscription: { priceId: process.env.STRIPE_PRICE_SUBSCRIPTION ?? null },
  tenMinute: { priceId: process.env.STRIPE_PRICE_TEN_MINUTE ?? null },
} as const;

type ServiceKey = keyof typeof serviceConfig;

const serviceKeys = Object.keys(serviceConfig) as ServiceKey[];

const emptyCounts: Record<ServiceKey, number> = {
  initial: 0,
  subscription: 0,
  tenMinute: 0,
};

type PaidCounts = typeof emptyCounts;

type ServicePrice = {
  unitAmount: number | null;
  currency: string | null;
  recurring: {
    interval: Stripe.Price.Recurring.Interval;
    intervalCount: number;
  } | null;
};

type ServicePrices = Record<ServiceKey, ServicePrice | null>;

const emptyServicePrices: ServicePrices = {
  initial: null,
  subscription: null,
  tenMinute: null,
};

const addLineItems = (
  counts: PaidCounts,
  lineItems: Stripe.LineItem[] | undefined,
) => {
  if (!lineItems) return;
  for (const item of lineItems) {
    const priceId = item.price?.id;
    const quantity = item.quantity ?? 1;
    if (!priceId) continue;

    for (const key of serviceKeys) {
      if (priceId === serviceConfig[key].priceId) {
        counts[key] += quantity;
      }
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
): Promise<{
  counts: PaidCounts;
  debugSessions?: DebugSession[];
}> => {
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

const fetchServicePrices = async (
  withDebug = false,
): Promise<{
  prices: ServicePrices;
  errors?: Partial<Record<ServiceKey, string>>;
}> => {
  if (!stripe) return { prices: { ...emptyServicePrices } };

  const errors: Partial<Record<ServiceKey, string>> | undefined = withDebug
    ? {}
    : undefined;

  const entries = await Promise.all(
    serviceKeys.map(async (key) => {
      const priceId = serviceConfig[key].priceId;
      if (!priceId) return [key, null] as const;

      try {
        const price = await stripe.prices.retrieve(priceId);
        return [
          key,
          {
            unitAmount: price.unit_amount,
            currency: price.currency ?? null,
            recurring: price.recurring
              ? {
                  interval: price.recurring.interval,
                  intervalCount: price.recurring.interval_count ?? 1,
                }
              : null,
          } satisfies ServicePrice,
        ] as const;
      } catch (error) {
        if (errors) {
          errors[key] =
            error instanceof Error ? error.message : "Unknown Stripe error";
        }
        return [key, null] as const;
      }
    }),
  );

  return {
    prices: Object.fromEntries(entries) as ServicePrices,
    ...(errors ? { errors } : {}),
  };
};

const fetchInitialPriceFromPaymentLink =
  async (): Promise<ServicePrice | null> => {
    if (!stripe) return null;

    let startingAfter: string | undefined;
    do {
      const links = await stripe.paymentLinks.list({
        limit: 100,
        starting_after: startingAfter,
      });
      const match = links.data.find(
        (link) => link.url === initialPaymentLinkUrl,
      );
      if (match) {
        const fullLink = await stripe.paymentLinks.retrieve(match.id, {
          expand: ["line_items.data.price"],
        });
        const item = fullLink.line_items?.data?.[0];
        if (!item) return null;

        const quantity = item.quantity ?? 1;
        const amountFromLineItem =
          typeof item.amount_subtotal === "number"
            ? Math.round(item.amount_subtotal / Math.max(quantity, 1))
            : typeof item.amount_total === "number"
              ? Math.round(item.amount_total / Math.max(quantity, 1))
              : null;

        const expandedPrice =
          item.price && typeof item.price !== "string" ? item.price : null;

        return {
          unitAmount: expandedPrice?.unit_amount ?? amountFromLineItem,
          currency: expandedPrice?.currency ?? item.currency ?? null,
          recurring: expandedPrice?.recurring
            ? {
                interval: expandedPrice.recurring.interval,
                intervalCount: expandedPrice.recurring.interval_count ?? 1,
              }
            : null,
        };
      }

      if (!links.has_more || links.data.length === 0) break;
      startingAfter = links.data[links.data.length - 1]?.id;
    } while (startingAfter);

    return null;
  };

export async function GET(request: Request) {
  if (!stripe) {
    return NextResponse.json({
      services: {
        initial: { paid: 0, completed: 0 },
        subscription: { paid: 0, completed: 0 },
        tenMinute: { paid: 0, completed: 0 },
      },
      prices: emptyServicePrices,
      error: "Missing STRIPE_SECRET_KEY",
    });
  }

  try {
    const isDebugMode = new URL(request.url).searchParams.get("debug") === "1";
    const [
      { counts: paidCounts, debugSessions },
      { prices: servicePrices, errors: priceErrors },
    ] = await Promise.all([
      fetchPaidCounts(isDebugMode),
      fetchServicePrices(isDebugMode),
    ]);
    let paymentLinkInitialPrice: ServicePrice | null = null;
    try {
      paymentLinkInitialPrice = await fetchInitialPriceFromPaymentLink();
    } catch {
      paymentLinkInitialPrice = null;
    }
    const resolvedPrices: ServicePrices = {
      ...servicePrices,
      initial: paymentLinkInitialPrice ?? servicePrices.initial,
    };

    return NextResponse.json({
      services: {
        initial: { paid: paidCounts.initial, completed: 0 },
        subscription: { paid: paidCounts.subscription, completed: 0 },
        tenMinute: { paid: paidCounts.tenMinute, completed: 0 },
      },
      prices: resolvedPrices,
      updatedAt: new Date().toISOString(),
      ...(debugSessions
        ? {
            debug: {
              priceIds: Object.fromEntries(
                serviceKeys.map((key) => [key, serviceConfig[key].priceId]),
              ),
              paymentLink: {
                initialUrl: initialPaymentLinkUrl,
                initialPriceResolved: Boolean(paymentLinkInitialPrice),
              },
              sessions: debugSessions,
              ...(priceErrors ? { priceErrors } : {}),
            },
          }
        : {}),
    });
  } catch {
    return NextResponse.json({
      services: {
        initial: { paid: 0, completed: 0 },
        subscription: { paid: 0, completed: 0 },
        tenMinute: { paid: 0, completed: 0 },
      },
      prices: emptyServicePrices,
      updatedAt: new Date().toISOString(),
      error: "Failed to fetch consultancy stats from Stripe",
    });
  }
}
