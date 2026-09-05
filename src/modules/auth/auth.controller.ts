import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import status from "http-status";
import { validateLoginInput, validateRegistrationInput } from "./auth.validation";
import config from "../../config";

import { jwtUtils } from "../../utils/jwt";



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
    const payload = req.body;
    const errors = validateLoginInput(payload)
    if(errors.length>0){
        return res.status(400).json({success:false,message:"Validation failed",errorDetails:errors})
    }
    const {accessToken,refreshToken} = await authService.loginUser(payload)
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge: 1000 * 60 * 60 *24 //24 hour
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge: 1000 * 60 * 60 * 24* 7 // 7day
    })


    
    sendResponse(res,{
        success:true,
        statusCode:status.OK,
        message:"User logged in successfully",
        data:{accessToken,refreshToken}
    })
})




const getMyProfile = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const {accessToken} = req.cookies;
    


    const verifiedToken = jwtUtils.verifyToken(accessToken,config.jwt_access_secret);
if(typeof verifiedToken ==="string"){
    throw new Error(verifiedToken)
}
const profile = await authService.getMyprofileFromDB(verifiedToken.id)


sendResponse(res,{
    success:true,
    statusCode:status.OK,
    message:"User profile fetched successfully",
    data:{profile}
})

})







export const authController = {
    registerUser,
    loginUser,
    getMyProfile,
   
}