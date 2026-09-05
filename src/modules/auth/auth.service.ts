import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { IloginUser, RegisterUserPayload } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";

const registerUserIntoDB = async (payload:RegisterUserPayload)=>{
    const {name,email,password,role}=payload;
    const isUserExist = await prisma.user.findUnique({
        where:{email}
    })
    if(isUserExist){
        throw new Error("User already exists with this email")
    }
 const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))
 const createUser = await prisma.user.create({
    data:{
        name,
        email,
        password:hashedPassword,
        role:role || "TENANT"
    },
    omit:{
        password:true
    }
    
})
return createUser;
}


const loginUser = async(payload:IloginUser) =>{
const {email,password} = payload;
const user  = await prisma.user.findUniqueOrThrow({
    where:{email}
})
   


const ispasswordMatched = await bcrypt.compare(password,user.password)
if(!ispasswordMatched){
    throw new Error("password is incorrect")
}
const jwtPayload ={
  id:user.id,
  name:user.name,
    email:user.email,
    role:user.role
}

const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
)
const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
)
return {
    accessToken,
    refreshToken,
    }

}




export const authService ={
    registerUserIntoDB,
    loginUser
}