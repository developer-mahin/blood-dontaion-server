import httpStatus from "http-status";

import jwt from "jsonwebtoken";
import AppError from "./AppError";

export const verifyToken = (token: string, accessToken: string) => {
  try {
    return jwt.verify(token, accessToken);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }
};
