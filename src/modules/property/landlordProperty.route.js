import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { propertyController } from "./property.controller";
const router = Router();
router.post("/", auth("LANDLORD"), propertyController.createProperty);
router.put("/:id", auth("LANDLORD"), propertyController.updateProperty);
router.delete("/:id", auth("LANDLORD"), propertyController.deleteProperty);
export const landlordPropertyRoute = router;
