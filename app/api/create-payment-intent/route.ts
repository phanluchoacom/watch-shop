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

  const price: any = Math.floor(totalPrice);
  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;
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
    try {
      // Kiểm tra xem có đơn hàng nào tồn tại với payment_intent_id này không
      const existingOrder = await prisma.order.findFirst({
        where: {
          paymentIntentId: payment_intent_id,
        },
      });

      if (existingOrder) {
        // Nếu có đơn hàng, cập nhật thông tin đơn hàng hiện có
        const updatedOrder = await prisma.order.update({
          where: {
            paymentIntentId: payment_intent_id,
          },
          data: {
            amount: total,
            products: items,
          },
        });

        const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, {
          amount: total,
        });

        return NextResponse.json({ paymentIntent: updatedIntent });
      } else {
        // Nếu không có đơn hàng, tạo mới đơn hàng và intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total,
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        });

        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
          data: orderData,
        });

        return NextResponse.json({ paymentIntent });
      }
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.error();
    }
  }

  return NextResponse.error();
}
