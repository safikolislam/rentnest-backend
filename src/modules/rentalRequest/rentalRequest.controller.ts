
import { catchAsync } from "../../utils/catchAsync";
import { rentalRequestValidation } from "./rentalRequest.Validation";
import { rentalRequestService } from "./rentalRequest.Service";
import type { Request, Response } from "express";


const createRequest = catchAsync(async (req: Request, res: Response) => {
    rentalRequestValidation.validateCreateRequestPayload(req.body);

    const tenantId = req.user?.id as string;
    const result = await rentalRequestService.createRequestIntoDB(req.body, tenantId);

    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Rental request submitted successfully",
        data: result
    });
});

const getMyRequests = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user?.id as string;
    const result = await rentalRequestService.getMyRequestsFromDB(tenantId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rental requests retrieved successfully",
        data: result
    });
});

const getSingleRequest = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id as string;
    const result = await rentalRequestService.getSingleRequestFromDB(id as string , userId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rental request retrieved successfully",
        data: result
    });
});

const getLandlordRequests = catchAsync(async (req: Request, res: Response) => {
    const landlordId = req.user?.id as string;
    const result = await rentalRequestService.getLandlordRequestsFromDB(landlordId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rental requests retrieved successfully",
        data: result
    });
});

const updateRequestStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    rentalRequestValidation.validateUpdateStatusPayload(status);

    const landlordId = req.user?.id as string;
    const result = await rentalRequestService.updateRequestStatusIntoDB(id as string, landlordId, status);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Rental request ${status.toLowerCase()} successfully`,
        data: result
    });
});

export const rentalRequestController = {
    createRequest,
    getMyRequests,
    getSingleRequest,
    getLandlordRequests,
    updateRequestStatus,
}