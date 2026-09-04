import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import status from "http-status";
import { validateRegistrationInput } from "./auth.validation";






const registerUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
     const errors = validateRegistrationInput(payload);
     if(errors.length>0){
        return res.status(400).json({success:false,message:"Validation failed", errorDetails:errors})
     } 



    const user = await authService.registerUserIntoDB(payload);


    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "User registered successfully",
        data: { user }
    })
})


// login 

const loginUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})







export const authController = {
    registerUser,
    loginUser
   
}