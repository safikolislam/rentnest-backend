import { catchAsync } from "../../utils/catchAsync";
import { rentalRequestValidation } from "./rentalRequest.Validation";
import { rentalRequestService } from "./rentalRequest.Service";
const createRequest = catchAsync(async (req, res) => {
    rentalRequestValidation.validateCreateRequestPayload(req.body);
    const tenantId = req.user?.id;
    const result = await rentalRequestService.createRequestIntoDB(req.body, tenantId);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Rental request submitted successfully",
        data: result
    });
});
const getMyRequests = catchAsync(async (req, res) => {
    const tenantId = req.user?.id;
    const result = await rentalRequestService.getMyRequestsFromDB(tenantId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rental requests retrieved successfully",
        data: result
    });
});
const getSingleRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const result = await rentalRequestService.getSingleRequestFromDB(id, userId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rental request retrieved successfully",
        data: result
    });
});
const getLandlordRequests = catchAsync(async (req, res) => {
    const landlordId = req.user?.id;
    const result = await rentalRequestService.getLandlordRequestsFromDB(landlordId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rental requests retrieved successfully",
        data: result
    });
});
const updateRequestStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    rentalRequestValidation.validateUpdateStatusPayload(status);
    const landlordId = req.user?.id;
    const result = await rentalRequestService.updateRequestStatusIntoDB(id, landlordId, status);
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
};
