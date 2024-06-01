import httpStatus from "http-status";
import { TAuthUser } from "../../../Interfaces/auth";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";
import { UserProfile } from "@prisma/client";

const getMyProfile = async (user: TAuthUser) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: user.userId,
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

  if (!findUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  return findUser;
};

const updateMyProfileIntoDB = async (
  user: TAuthUser,
  payload: Partial<UserProfile>
) => {
  const findUser = await prisma.userProfile.findUnique({
    where: {
      userId: user.userId,
    },
  });

  if (!findUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const result = await prisma.userProfile.update({
    where: {
      userId: user.userId,
    },
    data: {
      bio: payload.bio || findUser.bio,
      age: payload.age || findUser.age,
      lastDonationDate: payload.lastDonationDate || findUser.lastDonationDate,
    },
  });

  return result;
};
export const UserServices = {
  getMyProfile,
  updateMyProfileIntoDB,
};
