import httpStatus from "http-status";
import AppError from "./AppError";
import bcrypt from "bcryptjs";

const comparePassword = async (password: string, hashPassword: string) => {
  try {
    return bcrypt.compare(password, hashPassword);
  } catch (error) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Password not matched Please try again"
    );
  }
};

export default comparePassword;
