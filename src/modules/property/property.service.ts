import { prisma } from "../../lib/prisma"
import { PropertyPayload } from "./property.interface";

const createPropertyIntoDB = async(payload:PropertyPayload,landlordId:string)=>{
   const property = await prisma.property.create({
    data:{
        ...payload,
        landlordId,
    }
   });
   return property;
}

const getAllPropertiesFromDB = async ()=>{
    const properties = await prisma.property.findMany({
        include:{
            category:true,
            landlord:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    })
    return properties;
}

const getSinglePropertyFromDB = async(id:string)=>{
    const property = await prisma.property.findUnique({
        where:{id},
        include:{
            category:true,
            landlord:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    });
    if(!property){
        throw new Error("Property not found")
    }
    return property;
}

export const propertyService = {
    createPropertyIntoDB,
    getAllPropertiesFromDB,
    getSinglePropertyFromDB
}