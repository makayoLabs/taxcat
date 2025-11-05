import { NextResponse } from 'next/server';

let stripe: any = null;

// Initialize Stripe only if API key is provided
if (process.env.STRIPE_SECRET_KEY) {
  try {
    const StripeModule = require('stripe');
    stripe = new StripeModule(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  } catch (error) {
    console.warn('Stripe package not available or invalid configuration:', error);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!stripe) {
      return NextResponse.json({ 
        error: 'Payment processing not configured. Please configure Stripe API keys.' 
      }, { status: 503 });
    }

    const { amount } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 });
  }
}
