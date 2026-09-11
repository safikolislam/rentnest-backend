import jwt from "jsonwebtoken";
const createToken = (payload, secret, expiresIn) => {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};
const verifyToken = (token, secret) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return verifiedToken;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
export const jwtUtils = {
    createToken,
    verifyToken
};
