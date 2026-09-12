


import { RequestStatus } from "../../generated/prisma/enums";
import type { RentalRequestPayload } from "./rentalRequest.interface";





const validateCreateRequestPayload = (payload: RentalRequestPayload) => {
    if (!payload.propertyId || typeof payload.propertyId !== "string") {
        throw new Error("Property ID is required");
    }
    if (!payload.rentPeriod || typeof payload.rentPeriod !== "number" || payload.rentPeriod <= 0) {
        throw new Error("Rent period is required and must be a positive number");
    }
    if (!payload.message || payload.message.trim() === "") {
        throw new Error("Message is required");
    }
}

const validateUpdateStatusPayload = (status: RequestStatus) => {
    if (!status) {
        throw new Error("Status is required");
    }
    if (status !== "APPROVED" && status !== "REJECTED") {
        throw new Error("Invalid status. Must be APPROVED or REJECTED");
    }
}

export const rentalRequestValidation = {
    validateCreateRequestPayload,
    validateUpdateStatusPayload,
}