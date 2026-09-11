import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
    return prisma.user.findMany({
        omit: { password: true }
    });
}

const updateUserStatus = async (userId: string, statusValue: "ACTIVE" | "BANNED") => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new Error("User not found");
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { status: statusValue },
        omit: { password: true }
    });

    return updatedUser;
}

const getAllPropertiesFromDB = async () => {
    return prisma.property.findMany({
        include: { category: true, landlord: { select: { id: true, name: true, email: true } } }
    });
}

const getAllRentalsFromDB = async () => {
    return prisma.rentalRequest.findMany({
        include: { property: true, tenant: { select: { id: true, name: true, email: true } } }
    });
}

export const adminService = {
    getAllUsersFromDB,
    updateUserStatus,
    getAllPropertiesFromDB,
    getAllRentalsFromDB
}