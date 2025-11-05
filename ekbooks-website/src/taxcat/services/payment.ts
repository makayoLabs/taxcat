import Stripe from 'stripe';
import { PaymentStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

interface CreatePaymentIntentParams {
  amount: number;
  userId: string;
  taxReturnId: string;
  currency?: string;
}

interface PaymentResult {
  clientSecret: string;
  paymentIntentId: string;
}

export class PaymentService {
  private static readonly TAX_RETURN_BASE_PRICE = 9900; // $99.00
  private static readonly ADDITIONAL_FORM_PRICE = 2900; // $29.00 per additional form

  public static calculatePrice(formCount: number): number {
    return this.TAX_RETURN_BASE_PRICE + Math.max(0, formCount - 1) * this.ADDITIONAL_FORM_PRICE;
  }

  public async createPaymentIntent({
    amount,
    userId,
    taxReturnId,
    currency = 'usd',
  }: CreatePaymentIntentParams): Promise<PaymentResult> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          userId,
          taxReturnId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Create payment record in database
      await prisma.payment.create({
        data: {
          amount: amount / 100, // Convert cents to dollars
          currency: currency.toUpperCase(),
          status: PaymentStatus.PENDING,
          stripePaymentId: paymentIntent.id,
          userId,
          taxReturnId,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
      };
    } catch (___error) =>
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  public async handleWebhook(signature: string, payload: Buffer): Promise<void> {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
          break;
      }
    } catch (___error) =>
      console.error('Error handling webhook:', error);
      throw new Error('Webhook handling failed');
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const { userId, taxReturnId } = paymentIntent.metadata;

    await prisma.$transaction([
      // Update payment status
      prisma.payment.update({
        where: { stripePaymentId: paymentIntent.id },
        data: { status: PaymentStatus.COMPLETED },
      }),
      // Update tax return status
      prisma.taxReturn.update({
        where: { id: taxReturnId },
        data: { status: 'READY_TO_FILE' },
      }),
      // Create notification
      prisma.notification.create({
        data: {
          type: 'PAYMENT_REMINDER',
          title: 'Payment Successful',
          message:
            'Your payment has been processed successfully. Your tax return is ready to file.',
          userId,
        },
      }),
    ]);
  }

  private async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const { userId, taxReturnId } = paymentIntent.metadata;

    await prisma.$transaction([
      // Update payment status
      prisma.payment.update({
        where: { stripePaymentId: paymentIntent.id },
        data: { status: PaymentStatus.FAILED },
      }),
      // Create notification
      prisma.notification.create({
        data: {
          type: 'PAYMENT_REMINDER',
          title: 'Payment Failed',
          message: 'Your payment could not be processed. Please try again or contact support.',
          userId,
        },
      }),
    ]);
  }

  public async refundPayment(paymentIntentId: string, amount?: number): Promise<void> {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount,
      });

      if (refund.status === 'succeeded') {
        await prisma.payment.update({
          where: { stripePaymentId: paymentIntentId },
          data: { status: PaymentStatus.REFUNDED },
        });
      }
    } catch (___error) =>
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }
}
