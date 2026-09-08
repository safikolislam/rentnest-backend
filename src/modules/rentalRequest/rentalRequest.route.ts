import express from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../../middlewares/auth";


const router = express.Router();

router.post('/rentals', auth('TENANT'), rentalRequestController.createRequest);
router.get('/rentals', auth('TENANT'), rentalRequestController.getMyRequests);
router.get('/rentals/:id', auth('TENANT', 'LANDLORD'), rentalRequestController.getSingleRequest);

router.get('/landlord/requests', auth('LANDLORD'), rentalRequestController.getLandlordRequests);
router.patch('/landlord/requests/:id', auth('LANDLORD'), rentalRequestController.updateRequestStatus);

export const rentalRequestRoutes = router;