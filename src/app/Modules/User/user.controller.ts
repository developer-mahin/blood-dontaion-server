import httpStatus from "http-status";
import { TAuthUser } from "../../../Interfaces/auth";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import pick from "../../utils/pick";
import { donorSearchableQuery } from "../Donor/donor.constant";

const getAllUser = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const filter = pick(req.query, [...donorSearchableQuery, "searchTerm"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await UserServices.getAllUserFromDB(user, filter, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All user found successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All user found successfully",
    data: result,
  });
});

const myProfile = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await UserServices.getMyProfile(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await UserServices.updateMyProfileIntoDB(user, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});

const updateProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateProfileStatusIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});

const updateProfileRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateProfileRoleIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserControllers = {
  myProfile,
  updateMyProfile,
  getAllUser,
  getSingleUser,
  updateProfileStatus,
  updateProfileRole,
  deleteUser,
};
