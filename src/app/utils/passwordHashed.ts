import httpStatus from "http-status";
import AppError from "./AppError";
import bcrypt from "bcryptjs";

const passwordHashed = async (password: string, saltRound: number) => {
  try {
    return await bcrypt.hash(password, saltRound);
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export default passwordHashed;
