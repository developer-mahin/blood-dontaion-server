import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import Config from "../Config";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";
import { verifyToken } from "../utils/verifyToken";

const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
    }

    const decoded = verifyToken(
      token,
      Config.access_secret as string
    ) as JwtPayload;

    req.user = decoded;

    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, "User not found");
    }

    next();
  }
);

export default auth;
