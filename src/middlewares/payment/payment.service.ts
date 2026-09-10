import { prisma } from "../../lib/prisma";

import config from "../../config";
import { stripe } from "../../lib/stripe";



const createPaymentSession = async (rentalRequestId: string, userId: string) => {
    const rentalRequest = await prisma.rentalRequest.findUnique({
        where: { id: rentalRequestId },
        include: { property: true }
    });

    if (!rentalRequest) {
        throw new Error("Rental request not found");
    }

    if (rentalRequest.tenantId !== userId) {
        throw new Error("You are not authorized for this payment");
    }

    if (rentalRequest.status !== "APPROVED") {
        throw new Error("Rental request must be approved before payment");
    }

    const amount = rentalRequest.property.price;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: rentalRequest.property.title },
                    unit_amount: Math.round(amount * 100)  // Stripe cents এ নেয়
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${config.app_url}/api/payments?success=true`,
        cancel_url: `${config.app_url}/api/payments?success=false`,
        metadata: { rentalRequestId, userId }
    });

    return { paymentUrl: session.url };
}

const confirmPayment = async (payload: any) => {
    const { rentalRequestId, userId } = payload.metadata;

    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: { id: rentalRequestId },
        include: { property: true }
    });

    await prisma.payment.create({
        data: {
            transactionId: payload.id,
            rentalRequestId,
            userId,
            amount: rentalRequest.property.price,
            provider: "STRIPE",
            status: "COMPLETED",
            paidAt: new Date()
        }
    });

    await prisma.rentalRequest.update({
        where: { id: rentalRequestId },
        data: { status: "ACTIVE" }
    });
}

const getMyPayments = async (userId: string) => {
    return prisma.payment.findMany({ where: { userId } });
}

const getSinglePayment = async (id: string) => {
    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) throw new Error("Payment not found");
    return payment;
}

export const paymentService = {
    createPaymentSession,
    confirmPayment,
    getMyPayments,
    getSinglePayment
}