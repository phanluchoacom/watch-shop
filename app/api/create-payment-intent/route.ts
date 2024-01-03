import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return Math.floor(totalPrice) * 100;
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;
    const total = calculateOrderAmount(items);
    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: "usd",
      status: "pending",
      deliveryStatus: "pending",
      paymentIntentId: payment_intent_id,
      products: items,
    };

    if (payment_intent_id) {
      const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

      if (current_intent) {
        await stripe.paymentIntents.update(payment_intent_id, { amount: total });

        const existingOrder = await prisma.order.findFirst({
          where: {
            paymentIntentId: payment_intent_id,
          },
        });

        if (existingOrder) {
          await prisma.order.update({
            where: {
              paymentIntentId: payment_intent_id,
            },
            data: {
              amount: total,
              products: items,
            },
          });

          return NextResponse.json({ message: "Order updated successfully" });
        }
      }
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      orderData.paymentIntentId = paymentIntent.id;

      await prisma.order.create({
        data: orderData,
      });

      return NextResponse.json({ message: "Payment intent created successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
