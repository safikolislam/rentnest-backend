import { prisma } from "../../lib/prisma";
import type { CategoryPayload } from "./category.interface";


const createCategoryIntoDB = async (payload:CategoryPayload)=>{
    const {name} = payload;

    const isCategoryExist = await prisma.category.findUnique({
        where:{name}
    })
    if(isCategoryExist){
    throw new Error("Category already exists with this name")
}
const category = await prisma.category.create({
    data:{name}
})
return category;
}

const getAllCategoriesFromDB = async ()=>{
    const categories = await prisma.category.findMany();
    return categories
}


export const categoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB
}