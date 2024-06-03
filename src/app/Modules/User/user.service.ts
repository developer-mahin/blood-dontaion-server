import { Prisma, User, UserProfile, UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import { TAuthUser } from "../../../Interfaces/auth";
import AppError from "../../utils/AppError";
import { paginateQuery } from "../../utils/paginateQuery";
import prisma from "../../utils/prisma";
import { bloodGroup } from "../Donor/donor.constant";
import { userSearchableFieldWithOutBlood } from "./user.constant";

const getAllUserFromDB = async (user: TAuthUser, query: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } = paginateQuery(options);
  const { searchTerm, ...filteredData } = query;

  const andConditions: Prisma.UserWhereInput[] = [];

  const blood = bloodGroup.find((item) => item === searchTerm);
  if (query?.searchTerm && blood && query.searchTerm === blood) {
    andConditions.push({
      bloodType: query.searchTerm,
    });
  } else {
    andConditions.push({
      OR: userSearchableFieldWithOutBlood.map((fields) => {
        return {
          [fields]: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (Object.keys(filteredData).length) {
    andConditions.push({
      AND: Object.keys(filteredData).map((field) => {
        let query = (filteredData as any)[field];
        if (field === "availability") {
          query = filteredData[field] === "true" ? true : false;
        }
        return {
          [field]: {
            equals: query,
          },
        };
      }),
    });
  }

  const whereCondition: Prisma.UserWhereInput = { AND: andConditions };
  const withOutMe = {
    id: {
      not: user.userId,
    },
  };

  const result = await prisma.user.findMany({
    where: { ...whereCondition, ...withOutMe },
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      role: true,
      status: true,
      isRequest: true,
      isDontate: true,
      createdAt: true,
      userProfile: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.user.count();
  const meta = {
    total,
    page,
    limit,
  };

  return { result, meta };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      userProfile: true,
    },
  });
  return result;
};

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
  payload: Partial<UserProfile> & Partial<User>
) => {
  const { bio, age, lastDonationDate, photo, contactNumber, ...userData } =
    payload;

  const findUser = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!findUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  if (findUser?.status !== UserStatus.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not an active user");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    if (userData && Object.keys(userData).length) {
      await transactionClient.user.update({
        where: {
          id: user.userId,
        },
        data: userData,
      });
    }
    await transactionClient.userProfile.update({
      where: {
        userId: user.userId,
      },
      data: {
        bio: bio,
        age: age,
        lastDonationDate: lastDonationDate,
        photo: photo,
        contactNumber: contactNumber,
      },
    });
  });

  return result;
};

const updateProfileStatusIntoDB = async (id: string, payload: any) => {
  const { status } = payload;

  const isExist = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (isExist.status !== UserStatus.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is already blocked");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: status,
    },
  });

  return result;
};

export const UserServices = {
  getMyProfile,
  updateMyProfileIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateProfileStatusIntoDB,
};
