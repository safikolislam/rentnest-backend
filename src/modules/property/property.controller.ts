import { catchAsync } from "../../utils/catchAsync";
import status from "http-status";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import { validatePropertyInput } from "./property.validation";
import type { NextFunction, Request, Response } from "express";

const createProperty = catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
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

    const userId = req.user?.id || req.user?.userId;
    const property = await propertyService.createPropertyIntoDB(payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Property created successfully",
        data: property
    });
});

const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { location, minPrice, maxPrice, categoryId, amenities } = req.query;

    const properties = await propertyService.getAllPropertiesFromDB({
        location: location as string,
        minPrice: minPrice as string,
        maxPrice: maxPrice as string,
        categoryId: categoryId as string,
        amenities: amenities as string
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Properties retrieved successfully",
        data: properties
    });
});

const getMyProperties = catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const userId = req.user?.id || req.user?.userId;
    const properties = await propertyService.getLandlordPropertiesFromDB(userId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Landlord properties retrieved successfully",
        data: properties
    });
});

const getSingleProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const property = await propertyService.getSinglePropertyFromDB(id as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property retrieved successfully",
        data: property
    });
});

const updateProperty = catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?.id || req.user?.userId;
    const payload = req.body;

    const property = await propertyService.updatePropertyIntoDB(id as string, payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property updated successfully",
        data: property
    });
});

const deleteProperty = catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?.id || req.user?.userId;

    await propertyService.deletePropertyFromDB(id as string, userId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property deleted successfully",
        data: null
    });
});

const propertyController = {
    createProperty,
    getAllProperties,
    getMyProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty
};

export default propertyController;