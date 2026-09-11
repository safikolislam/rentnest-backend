import { prisma } from "../../lib/prisma";
const createCategoryIntoDB = async (payload) => {
    const { name } = payload;
    const isCategoryExist = await prisma.category.findUnique({
        where: { name }
    });
    if (isCategoryExist) {
        throw new Error("Category already exists with this name");
    }
    const category = await prisma.category.create({
        data: { name }
    });
    return category;
};
const getAllCategoriesFromDB = async () => {
    const categories = await prisma.category.findMany();
    return categories;
};
export const categoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB
};
