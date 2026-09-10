export const validatePaymentInput = (data: any) => {
    const errors: string[] = [];

    if (!data.rentalRequestId || typeof data.rentalRequestId !== "string") {
        errors.push("rentalRequestId is required");
    }

    return errors;
}