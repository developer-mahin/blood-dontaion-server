import jwt, { Secret } from "jsonwebtoken";
import AppError from "./AppError";
import httpStatus from "http-status";

type TJwtPayload = {
  userId: string;
  email: string;
};

export const generateJwtToken = (
  payload: TJwtPayload,
  secretToken: Secret,
  expiresIn: string
) => {
  try {
    return jwt.sign(payload, secretToken, { expiresIn });
  } catch (error: any) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
