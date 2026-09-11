export const validateCategoryInput = (data) => {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) {
        errors.push("Category name must be at least 2 characters");
    }
    return errors;
};
