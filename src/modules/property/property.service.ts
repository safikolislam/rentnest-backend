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



const updatePropertyIntoDB = async (id: string, payload: Partial<PropertyPayload>, landlordId: string) => {
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) {
        throw new Error("Property not found");
    }

    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this property");
    }

    const updatedProperty = await prisma.property.update({
        where: { id },
        data: payload
    });

    return updatedProperty;
}

const deletePropertyFromDB = async (id: string, landlordId: string) => {
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) {
        throw new Error("Property not found");
    }

    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to delete this property");
    }

    await prisma.property.delete({ where: { id } });

    return null;
}




export const propertyService = {
    createPropertyIntoDB,
    getAllPropertiesFromDB,
    getSinglePropertyFromDB,
    updatePropertyIntoDB,
    deletePropertyFromDB,
}