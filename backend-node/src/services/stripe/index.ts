import Stripe from "stripe";
import { config } from "@/config";

export const processStripePayment = async ({
  stripeCustomerId,
  amount,
  currency,
  description,
}: {
  stripeCustomerId: string | null;
  amount: number;
  currency: string;
  description: string;
}): Promise<{
  paymentIntentClientSecret: string;
  ephemeralKeySecret: string;
  customerId: string;
  publishableKey: string;
}> => {
  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  let customer;
  if (stripeCustomerId) {
    customer = await stripe.customers.retrieve(stripeCustomerId).catch(async (err: any) => {
      if (err.type === 'StripeInvalidRequestError') {
        return await stripe.customers.create();
      }
      throw err;
    });
  } else {
    customer = await stripe.customers.create();
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2023-10-16" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    description: description,
    automatic_payment_methods: { enabled: true },
  });
  console.log('returninggg from stripe', paymentIntent.client_secret, ephemeralKey.secret, customer.id, config.STRIPE_PUBLISHABLE_KEY);
  return {
    paymentIntentClientSecret: paymentIntent.client_secret!,
    ephemeralKeySecret: ephemeralKey.secret!,
    customerId: customer.id,
    publishableKey: config.STRIPE_PUBLISHABLE_KEY,
  };
};

