import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { IloginUser, RegisterUserPayload } from "./auth.interface";


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
return user;
}




export const authService ={
    registerUserIntoDB,
    loginUser
}