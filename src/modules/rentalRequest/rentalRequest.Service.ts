
import { RequestStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { RentalRequestPayload } from "./rentalRequest.interface";



const createRequestIntoDB = async (payload: RentalRequestPayload, tenantId: string) => {
    const property = await prisma.property.findUnique({ where: { id: payload.propertyId } });

    if (!property) {
        throw new Error("Property not found");
    }

    if (property.status !== "AVAILABLE") {
        throw new Error("This property is not available for rent");
    }

    const rentalRequest = await prisma.rentalRequest.create({
        data: {
            ...payload,
            tenantId,
        }
    });
    return rentalRequest;
}

const getMyRequestsFromDB = async (tenantId: string) => {
    const requests = await prisma.rentalRequest.findMany({
        where: { tenantId },
        include: {
            property: true
        }
    })
    return requests;
}

const getSingleRequestFromDB = async (id: string, userId: string) => {
    const request = await prisma.rentalRequest.findUnique({
        where: { id },
        include: {
            property: true,
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    if (!request) {
        throw new Error("Rental request not found")
    }

    const isTenant = request.tenantId === userId;
    const isLandlord = request.property.landlordId === userId;

    if (!isTenant && !isLandlord) {
        throw new Error("You are not authorized to view this request");
    }

    return request;
}

const getLandlordRequestsFromDB = async (landlordId: string) => {
    const requests = await prisma.rentalRequest.findMany({
        where: {
            property: {
                landlordId
            }
        },
        include: {
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            property: true
        }
    })
    return requests;
}

const updateRequestStatusIntoDB = async (id: string, landlordId: string, status: RequestStatus) => {
    const request = await prisma.rentalRequest.findUnique({
        where: { id },
        include: { property: true }
    });

    if (!request) {
        throw new Error("Rental request not found");
    }

    if (request.property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this request");
    }

    if (request.status !== "PENDING") {
        throw new Error(`Request is already ${request.status.toLowerCase()}`);
    }

    const updatedRequest = await prisma.rentalRequest.update({
        where: { id },
        data: { status }
    });

    return updatedRequest;
}

export const rentalRequestService = {
    createRequestIntoDB,
    getMyRequestsFromDB,
    getSingleRequestFromDB,
    getLandlordRequestsFromDB,
    updateRequestStatusIntoDB,
}