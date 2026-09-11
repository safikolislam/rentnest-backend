import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./review.service";
const createReview = catchAsync(async (req, res) => {
    const tenantId = req.user?.id;
    const result = await reviewService.createReview(tenantId, req.body);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Review submitted successfully",
        data: result,
    });
});
const getPropertyReviews = catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    const result = await reviewService.getPropertyReviews(propertyId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Reviews retrieved successfully",
        data: result,
    });
});
export const reviewController = {
    createReview,
    getPropertyReviews,
};
