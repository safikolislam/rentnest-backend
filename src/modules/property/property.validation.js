export const validatePropertyInput = (data) => {
    const errors = [];
    if (!data.title || data.title.trim().length < 3) {
        errors.push("Title must be at least 3 characters");
    }
    if (!data.description || data.description.trim().length < 10) {
        errors.push("Description must be at least 10 characters");
    }
    if (!data.location || data.location.trim().length < 2) {
        errors.push("Location is required");
    }
    if (!data.price || typeof data.price !== "number" || data.price <= 0) {
        errors.push("Price must be a positive number");
    }
    if (!data.categoryId || typeof data.categoryId !== "string") {
        errors.push("Category is required");
    }
    if (data.amenities && !Array.isArray(data.amenities)) {
        errors.push("Amenities must be an array");
    }
    if (data.images && !Array.isArray(data.images)) {
        errors.push("Images must be an array");
    }
    return errors;
};
