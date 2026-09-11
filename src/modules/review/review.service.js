import { prisma } from "../../lib/prisma";
const createReview = async (tenantId, payload) => {
    const { propertyId, rating, comment } = payload;
    if (!propertyId) {
        throw new Error("Property ID is required");
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
        throw new Error("Rating must be a number between 1 and 5");
    }
    if (!comment || typeof comment !== "string" || comment.trim().length < 3) {
        throw new Error("Comment must be at least 3 characters long");
    }
    const validRental = await prisma.rentalRequest.findFirst({
        where: {
            tenantId,
            propertyId,
            status: { in: ["ACTIVE", "COMPLETED"] },
        },
    });
    if (!validRental) {
        throw new Error("You can only review properties that you have rented or are currently renting.");
    }
    const review = await prisma.review.create({
        data: {
            tenantId,
            propertyId,
            rating,
            comment: comment.trim(),
        },
    });
    return review;
};
const getPropertyReviews = async (propertyId) => {
    if (!propertyId) {
        throw new Error("Property ID is required");
    }
    return prisma.review.findMany({
        where: { propertyId },
        include: {
            tenant: {
                select: { id: true, name: true, email: true },
            },
        },
    });
};
export const reviewService = {
    createReview,
    getPropertyReviews,
};
