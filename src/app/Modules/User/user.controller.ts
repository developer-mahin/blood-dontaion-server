import httpStatus from "http-status";
import { TAuthUser } from "../../../Interfaces/auth";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

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

export const UserControllers = {
  myProfile,
  updateMyProfile,
};
