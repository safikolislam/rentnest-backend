import { Router } from "express";
import { propertyController } from "./property.controller";
import { auth } from "../../middlewares/auth";

const router = Router();


router.post("/",auth("LANDLORD"),propertyController.createProperty);
router.get("/",propertyController.getAllProperties);
router.get("/:id",propertyController.getSingleProperty);

export const propertyRoute = router;
