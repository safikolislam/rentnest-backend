import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/create", auth("TENANT"), paymentController.createPaymentSession);
router.post("/confirm", paymentController.handleWebhook);   
router.get("/", auth(), paymentController.getMyPayments);
router.get("/:id", auth(), paymentController.getSinglePayment);

export const paymentRoute = router;