import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";
import status from "http-status";
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await adminService.getAllUsersFromDB();
    sendResponse(res, { success: true, statusCode: status.OK, message: "Users retrieved successfully", data: users });
});
const updateUserStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status: newStatus } = req.body;
    if (!newStatus || (newStatus !== "ACTIVE" && newStatus !== "BANNED")) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            statusCode: status.BAD_REQUEST,
            message: "Validation failed",
            errorDetails: ["status must be ACTIVE or BANNED"]
        });
    }
    const user = await adminService.updateUserStatus(id, newStatus);
    sendResponse(res, { success: true, statusCode: status.OK, message: "User status updated successfully", data: user });
});
const getAllProperties = catchAsync(async (req, res, next) => {
    const properties = await adminService.getAllPropertiesFromDB();
    sendResponse(res, { success: true, statusCode: status.OK, message: "Properties retrieved successfully", data: properties });
});
const getAllRentals = catchAsync(async (req, res, next) => {
    const rentals = await adminService.getAllRentalsFromDB();
    sendResponse(res, { success: true, statusCode: status.OK, message: "Rentals retrieved successfully", data: rentals });
});
export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentals
};
