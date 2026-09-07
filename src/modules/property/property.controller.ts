import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import status from "http-status";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import { validatePropertyInput } from "./property.validation";





const createProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload = req.body;
     const errors = validatePropertyInput(payload);
     if(errors.length>0){
        return res.status(status.BAD_REQUEST).json({
            success:false,
            statusCode:status.BAD_REQUEST,
            message:"Validation failed",
            errorDetails:errors
        })
     }
     const landloardId = req.user!.id;
     const property = await propertyService.createPropertyIntoDB(payload,landloardId)
     sendResponse(res,{
        success:true,
        statusCode:status.CREATED,
        message:"Property created successfully",
        data:property
     })
})


const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const properties = await propertyService.getAllPropertiesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Properties retrieved successfully",
        data: properties
    })
})

const getSingleProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const {id} = req.params;
const property = await propertyService.getSinglePropertyFromDB(id  as string)

sendResponse(res,{
    success:true,
    statusCode:status.OK,
    message:"Property retrived successfully",
    data:property
})
})




const updateProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const landlordId = req.user!.id;
    const payload = req.body;

    const property = await propertyService.updatePropertyIntoDB(id as string, payload, landlordId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property updated successfully",
        data: property
    })
})

const deleteProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const landlordId = req.user!.id;

    await propertyService.deletePropertyFromDB(id as string, landlordId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Property deleted successfully",
        data: null
    })
})






export const propertyController = {
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty
}