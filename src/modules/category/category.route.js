import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { categoryController } from "./category.controller";
const router = Router();
router.post("/", auth("ADMIN"), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
export const categoryRoute = router;
