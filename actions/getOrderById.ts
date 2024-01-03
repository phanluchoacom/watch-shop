"use client";

import prisma from "@/libs/prismadb";

interface Iparams {
  orderId?: string;
}

export default async function getOrderById(params: Iparams) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return null;
    }
    return order;
  } catch (err: any) {
    throw new Error(err);
  }
}
