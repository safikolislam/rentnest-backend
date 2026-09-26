import { prisma } from "../../lib/prisma"
import type { PropertyFilters, PropertyPayload } from "./property.interface";

const createPropertyIntoDB = async (payload: PropertyPayload, userId: string) => {
    const property = await prisma.property.create({
        data: {
            ...payload,
            landlordId: userId,
        }
    });
    return property;
}

const getAllPropertiesFromDB = async (filters: PropertyFilters) => {
    const { location, minPrice, maxPrice, categoryId, amenities } = filters;

    const properties = await prisma.property.findMany({
        where: {
            ...(location && { location: { contains: location, mode: "insensitive" } }),
            ...(categoryId && { categoryId }),
            ...(amenities && { amenities: { has: amenities } }),
            ...(minPrice || maxPrice ? {
                price: {
                    ...(minPrice && { gte: Number(minPrice) }),
                    ...(maxPrice && { lte: Number(maxPrice) })
                }
            } : {})
        },
        include: {
            category: true,
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return properties;
}

const getLandlordPropertiesFromDB = async (userId: string) => {
    const properties = await prisma.property.findMany({
        where: {
            landlordId: userId,
        },
        include: {
            category: true,
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    return properties;
}

const getSinglePropertyFromDB = async (id: string) => {
    const property = await prisma.property.findUnique({
        where: { id },
        include: {
            category: true,
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    if (!property) {
        throw new Error("Property not found")
    }
    return property;
}

const updatePropertyIntoDB = async (id: string, payload: Partial<PropertyPayload>, userId: string) => {
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) {
        throw new Error("Property not found");
    }

    if (property.landlordId !== userId) {
        throw new Error("You are not authorized to update this property");
    }

    const updatedProperty = await prisma.property.update({
        where: { id },
        data: payload
    });

    return updatedProperty;
}

const deletePropertyFromDB = async (id: string, userId: string) => {
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) {
        throw new Error("Property not found");
    }

    if (property.landlordId !== userId) {
        throw new Error("You are not authorized to delete this property");
    }

    const rentalRequests = await prisma.rentalRequest.findMany({
        where: { propertyId: id },
        select: { id: true }
    });

    const rentalRequestIds = rentalRequests.map((r) => r.id);

    if (rentalRequestIds.length > 0) {
        await prisma.payment.deleteMany({
            where: { rentalRequestId: { in: rentalRequestIds } }
        });
    }

    await prisma.review.deleteMany({
        where: { propertyId: id }
    });

    await prisma.rentalRequest.deleteMany({
        where: { propertyId: id },
    });

    await prisma.property.delete({ where: { id } });

    return null;
}

export const propertyService = {
    createPropertyIntoDB,
    getAllPropertiesFromDB,
    getLandlordPropertiesFromDB,
    getSinglePropertyFromDB,
    updatePropertyIntoDB,
    deletePropertyFromDB,
}