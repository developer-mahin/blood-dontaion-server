import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";
import { TChangePassword, TRegisterUser } from "./auth.interface";
import passwordHashed from "../../utils/passwordHashed";
import { User, UserProfile } from "@prisma/client";
import comparePassword from "../../utils/comparePassword";
import { generateJwtToken } from "../../utils/generateToken";
import Config from "../../Config";
import { Secret } from "jsonwebtoken";
import { TAuthUser } from "../../../Interfaces/auth";

const userRegistrationIntoDB = async (payload: TRegisterUser) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "user already have with this email address"
    );
  }

  const hashPassword = await passwordHashed(payload.password, 10);

  const result = await prisma.$transaction(async (transactionClient) => {
    const newUser = await transactionClient.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashPassword,
        bloodType: payload.bloodType,
        location: payload.location,
      },
    });

    await transactionClient.userProfile.create({
      data: {
        userId: newUser.id,
        bio: payload.bio,
        age: 12,
        lastDonationDate: payload.lastDonationDate,
      },
    });

    const result = await transactionClient.user.findUnique({
      where: {
        id: newUser.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        location: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
        userProfile: true,
      },
    });

    return result;
  });

  return result;
};

const loginUser = async (payload: Pick<User, "email" | "password">) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found with this email!!"
    );
  }

  const isMatchedPassword = await comparePassword(
    payload.password,
    isExist.password
  );

  if (!isMatchedPassword) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Password not matched Please try again"
    );
  }

  const userInfo = {
    userId: isExist.id,
    email: isExist.email,
  };

  const accessToken = generateJwtToken(
    userInfo,
    Config.access_secret as Secret,
    Config.access_expires_in as string
  );

  const refreshToken = generateJwtToken(
    userInfo,
    Config.refresh_secret as Secret,
    Config.refresh_expires_in as string
  );

  const result = await prisma.user.findUnique({
    where: {
      id: isExist.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (user: TAuthUser, payload: TChangePassword) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isMatchedPassword = await comparePassword(
    payload.currentPassword,
    isUserExist.password
  );

  if (!isMatchedPassword) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Please Enter valid email or password"
    );
  }

  const hashPassword = await passwordHashed(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      email: isUserExist.email,
    },
    data: {
      password: hashPassword,
    },
  });
};

export const AuthServices = {
  userRegistrationIntoDB,
  loginUser,
  changePassword,
};
