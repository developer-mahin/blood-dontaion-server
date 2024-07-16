import { Prisma, RequestModel, UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { TAuthUser } from "../../../Interfaces/auth";
import AppError from "../../utils/AppError";
import { paginateQuery } from "../../utils/paginateQuery";
import prisma from "../../utils/prisma";
import { bloodGroup, donorSearchableQueryWithOutBlood } from "./donor.constant";

const getAllDonorFromDB = async (query: any, options: any) => {
  const { page, limit, sortBy, sortOrder, skip } = paginateQuery(options);
  const { searchTerm, ...filteredData } = query;
  const andCondition: Prisma.UserWhereInput[] = [];

  console.log(filteredData);

  const blood = bloodGroup.find((item) => item === searchTerm);
  if (query?.searchTerm && blood && query.searchTerm === blood) {
    andCondition.push({
      bloodType: query.searchTerm,
    });
  } else {
    andCondition.push({
      OR: donorSearchableQueryWithOutBlood.map((fields) => {
        return {
          [fields]: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  const bloodFilter = bloodGroup.find((item) => item === searchTerm);
  if (filteredData && bloodFilter && filteredData === bloodFilter) {
    andCondition.push({
      bloodType: {
        equals: filteredData,
      },
    });
  } else if (Object.keys(filteredData).length > 0) {
    andCondition.push({
      AND: Object.keys(filteredData).map((key) => ({
        [key]: {
          equals: filteredData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput = { AND: andCondition };
  const withOutAdmin = {
    role: {
      not: "ADMIN" as UserRole,
    },
  };

  const result = await prisma.user.findMany({
    where: { ...whereCondition, ...withOutAdmin },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      isDontate: true,
      isRequest: true,
      createdAt: true,
      updatedAt: true,
      userProfile: true,
    },
  });

  const total = await prisma.user.count();
  const meta = {
    total,
    page,
    limit,
  };

  return { meta, result };
};

const donationRequestIntoDB = async (payload: RequestModel) => {
  const findDonor = await prisma.user.findUnique({
    where: {
      id: payload.donorId,
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

  if (!findDonor) {
    throw new AppError(httpStatus.NOT_FOUND, "Donor not found with this id");
  }

  const newRequest = await prisma.requestModel.create({
    data: {
      donorId: payload.donorId,
      requesterId: payload.requesterId,
      phoneNumber: payload.phoneNumber,
      dateOfDonation: payload.dateOfDonation,
      hospitalName: payload.hospitalAddress,
      hospitalAddress: payload.hospitalAddress,
      reason: payload.reason,
    },
  });

  const result = await prisma.requestModel.findUnique({
    where: {
      id: newRequest.id,
    },
    select: {
      id: true,
      donorId: true,
      requester: true,
      phoneNumber: true,
      dateOfDonation: true,
      hospitalName: true,
      hospitalAddress: true,
      reason: true,
      requestStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    ...result,
    donor: {
      ...findDonor,
      userProfile: findDonor.userProfile,
    },
  };
};

// Me As a Requester
const getDonationRequestFromDB = async (user: TAuthUser) => {
  const { userId } = user;

  const donationRequests = await prisma.requestModel.findMany({
    where: {
      requesterId: userId,
    },
    include: {
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          bloodType: true,
          availability: true,
          userProfile: true,
        },
      },
    },
  });

  return donationRequests;
};

// Me As a Donorcd
const getMyDonationFromDB = async (user: TAuthUser) => {
  const { userId } = user;

  const donationRequests = await prisma.requestModel.findMany({
    where: {
      donorId: userId,
    },
    include: {
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          bloodType: true,
          availability: true,
          userProfile: true,
        },
      },
    },
  });

  return donationRequests;
};

const updateDonationStatusIntoDB = async (
  id: string,
  payload: Pick<RequestModel, "requestStatus">
) => {
  const isExist = await prisma.requestModel.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found");
  }

  const result = await prisma.requestModel.update({
    where: {
      id,
    },
    data: {
      requestStatus: payload.requestStatus,
    },
  });

  return result;
};

export const DonorServices = {
  getAllDonorFromDB,
  donationRequestIntoDB,
  getDonationRequestFromDB,
  updateDonationStatusIntoDB,
  getMyDonationFromDB,
};
