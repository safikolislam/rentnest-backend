import { Router } from "express";
import { authController } from "./auth/auth.controller";

const router = Router();

router.post("/register",authController.registerUser);
export const userRoute = router;