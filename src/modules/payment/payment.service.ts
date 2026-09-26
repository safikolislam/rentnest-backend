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
    const baseUrl = (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/+$/, "");

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: rentalRequest.property.title },
                    unit_amount: Math.round(amount * 100)
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${baseUrl}/dashboard/tenant?success=true&rentalRequestId=${rentalRequestId}`,
        cancel_url: `${baseUrl}/dashboard/tenant?canceled=true`,
        metadata: {
            rentalRequestId: String(rentalRequestId),
            userId: String(userId)
        }
    });

    return { paymentUrl: session.url };
};

const confirmPayment = async (payload: any) => {
    const session = payload;
    const { rentalRequestId, userId } = session.metadata || {};

    if (!rentalRequestId || !userId) {
        throw new Error("Missing metadata in payment session");
    }

    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: { id: rentalRequestId },
        include: { property: true }
    });

    await prisma.payment.create({
        data: {
            transactionId: session.id,
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
};

const getMyPayments = async (userId: string) => {
    return prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });
};

const getSinglePayment = async (id: string) => {
    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) throw new Error("Payment not found");
    return payment;
};

export const paymentService = {
    createPaymentSession,
    confirmPayment,
    getMyPayments,
    getSinglePayment
};