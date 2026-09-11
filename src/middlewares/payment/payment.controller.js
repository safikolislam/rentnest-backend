import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { validatePaymentInput } from "./payment.validation";
import status from "http-status";
import { paymentService } from "./payment.service";
const createPaymentSession = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const errors = validatePaymentInput(payload);
    if (errors.length > 0) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            statusCode: status.BAD_REQUEST,
            message: "Validation failed",
            errorDetails: errors
        });
    }
    const userId = req.user.id;
    const result = await paymentService.createPaymentSession(payload.rentalRequestId, userId);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Payment session created successfully",
        data: result
    });
});
const handleWebhook = catchAsync(async (req, res, next) => {
    const event = req.body; // Stripe webhook থেকে event আসবে
    if (event.type === "checkout.session.completed") {
        await paymentService.confirmPayment(event.data.object);
    }
    res.status(status.OK).json({ received: true });
});
const getMyPayments = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const payments = await paymentService.getMyPayments(userId);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Payments retrieved successfully",
        data: payments
    });
});
const getSinglePayment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const payment = await paymentService.getSinglePayment(id);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Payment retrieved successfully",
        data: payment
    });
});
export const paymentController = {
    createPaymentSession,
    handleWebhook,
    getMyPayments,
    getSinglePayment
};
