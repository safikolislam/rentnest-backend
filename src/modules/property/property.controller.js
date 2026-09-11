import { catchAsync } from "../../utils/catchAsync";
import status from "http-status";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import { validatePropertyInput } from "./property.validation";
const createProperty = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const errors = validatePropertyInput(payload);
    if (errors.length > 0) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            statusCode: status.BAD_REQUEST,
            message: "Validation failed",
            errorDetails: errors
        });
    }
    const landloardId = req.user.id;
    const property = await propertyService.createPropertyIntoDB(payload, landloardId);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Property created successfully",
        data: property
    });
});
const getAllProperties = catchAsync(async (req, res, next) => {
    const { location, minPrice, maxPrice, categoryId, amenities } = req.query;
    const properties = await propertyService.getAllPropertiesFromDB({
        location: location,
        minPrice: minPrice,
        maxPrice: maxPrice,
        categoryId: categoryId,
        amenities: amenities
    });
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Properties retrieved successfully",
        data: properties
    });
});
const getSingleProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const property = await propertyService.getSinglePropertyFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property retrived successfully",
        data: property
    });
});
const updateProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const landlordId = req.user.id;
    const payload = req.body;
    const property = await propertyService.updatePropertyIntoDB(id, payload, landlordId);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property updated successfully",
        data: property
    });
});
const deleteProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const landlordId = req.user.id;
    await propertyService.deletePropertyFromDB(id, landlordId);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property deleted successfully",
        data: null
    });
});
export const propertyController = {
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty
};
