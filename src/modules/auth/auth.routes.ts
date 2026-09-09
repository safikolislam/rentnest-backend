import {  Router } from "express";
import { authController } from "./auth.controller";

import { Role } from "../../../prisma/generated/prisma/enums";

import { auth } from "../../middlewares/auth";

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