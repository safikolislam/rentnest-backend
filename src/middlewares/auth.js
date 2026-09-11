import config from "../config";
import { prisma } from "../lib/prisma";
import { jwtUtils } from "../utils/jwt";
import { catchAsync } from "../utils/catchAsync";
export const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies?.accessToken ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : req.headers.authorization);
        if (!token) {
            throw new Error("You are not logged in. Please log in to access this resource.");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
        const { email, name, id, role } = verifiedToken;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden. You don't have permission to access this resource.");
        }
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new Error("User not found. Please log in again.");
        }
        if (user.status === "BANNED") {
            throw new Error("Your account has been banned. Please contact support.");
        }
        req.user = { email, name, id, role };
        next();
    });
};
