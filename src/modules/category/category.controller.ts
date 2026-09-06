import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import status from "http-status";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import { validateCategoryInput } from "./category.validation";






const createCategory = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload = req.body;

    const errors = validateCategoryInput(payload);
    if(errors.length>0){
        return res.status(status.BAD_REQUEST).json({
            success:false,
            statusCode:status.BAD_REQUEST,
            message:"validation failed",
            errorDetails : errors
        })
    }
    const category = await categoryService.createCategoryIntoDB(payload);
    sendResponse(res,{
        success:true,
        statusCode:status.CREATED,
        message:"Category created successfully",
        data:category
    })

})


const getAllCategories = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const categories = await categoryService.getAllCategoriesFromDB()

    sendResponse(res,{
        success:true,
        statusCode:status.OK,
        message:"Categories retrived successfully",
        data:categories
    })
})

export const categoryController = {
    createCategory,
    getAllCategories
}