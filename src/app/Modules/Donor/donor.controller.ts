import httpStatus from "http-status";
import { TAuthUser } from "../../../Interfaces/auth";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { donorSearchableQuery } from "./donor.constant";
import { DonorServices } from "./donor.service";

const getAllDonor = catchAsync(async (req, res) => {
  const filter = pick(req.query, [...donorSearchableQuery, "searchTerm"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await DonorServices.getAllDonorFromDB(filter, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Donors successfully found",
    meta: result.meta,
    data: result.result,
  });
});

const donationRequest = catchAsync(async (req, res) => {
  const result = await DonorServices.donationRequestIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Request successfully made",
    data: result,
  });
});

const getMyDonation = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await DonorServices.getMyDonationFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Request successfully made",
    data: result,
  });
});

const getDonationRequest = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await DonorServices.getDonationRequestFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Donation requests retrieved successfully",
    data: result,
  });
});

const updateDonationStatus = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await DonorServices.updateDonationStatusIntoDB(
    requestId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Donation requests retrieved successfully",
    data: result,
  });
});

export const DonorControllers = {
  getAllDonor,
  donationRequest,
  getDonationRequest,
  getMyDonation,
  updateDonationStatus,
};
