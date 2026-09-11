import {  Router } from "express";
import { authController } from "./auth.controller";


import { auth } from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();
declare global{
    namespace Express {
       interface Request {
        user?:{
            email:string;
            name:string;
            id:string;
            role:Role;
        }
       }
    }
}

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)




router.get("/me", auth(Role.ADMIN,Role.LANDLORD,Role.TENANT),
    
    authController.getMyProfile)
export const authRoutes = router; 