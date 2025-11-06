import Stripe from 'stripe';
import { captureError } from '../monitoring/sentry';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export interface PaymentIntent {
  id: string;
  amount: number;
  status: string;
  clientSecret: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  status: string;
  currentPeriodEnd: Date;
  plan: {
    id: string;
    name: string;
    amount: number;
  };
}

export const createPaymentIntent = async (
  amount: number,
  currency: string = 'cad'
): Promise<PaymentIntent> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret!,
    };
  } catch (error) {
    captureError(error as Error, { amount, currency });
    throw new Error('Failed to create payment intent');
  }
};

export const createSubscription = async (
  customerId: string,
  priceId: string
): Promise<Subscription> => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    return {
      id: subscription.id,
      customerId,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: {
        id: subscription.items.data[0].price.id,
        name: subscription.items.data[0].price.nickname || 'Default Plan',
        amount: subscription.items.data[0].price.unit_amount || 0,
      },
    };
  } catch (error) {
    captureError(error as Error, { customerId, priceId });
    throw new Error('Failed to create subscription');
  }
};

export const cancelSubscription = async (subscriptionId: string): Promise<void> => {
  try {
    await stripe.subscriptions.cancel(subscriptionId);
  } catch (error) {
    captureError(error as Error, { subscriptionId });
    throw new Error('Failed to cancel subscription');
  }
};

export const createCustomer = async (
  email: string,
  name: string,
  paymentMethodId?: string
): Promise<string> => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethodId,
    });

    return customer.id;
  } catch (error) {
    captureError(error as Error, { email, name });
    throw new Error('Failed to create customer');
  }
};

export const updateSubscription = async (
  subscriptionId: string,
  newPriceId: string
): Promise<Subscription> => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    });

    return {
      id: updatedSubscription.id,
      customerId: updatedSubscription.customer as string,
      status: updatedSubscription.status,
      currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
      plan: {
        id: updatedSubscription.items.data[0].price.id,
        name: updatedSubscription.items.data[0].price.nickname || 'Updated Plan',
        amount: updatedSubscription.items.data[0].price.unit_amount || 0,
      },
    };
  } catch (error) {
    captureError(error as Error, { subscriptionId, newPriceId });
    throw new Error('Failed to update subscription');
  }
};
