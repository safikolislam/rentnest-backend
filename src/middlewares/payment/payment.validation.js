export const validatePaymentInput = (data) => {
    const errors = [];
    if (!data.rentalRequestId || typeof data.rentalRequestId !== "string") {
        errors.push("rentalRequestId is required");
    }
    return errors;
};
