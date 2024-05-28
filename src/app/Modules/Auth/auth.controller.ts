import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import Config from "../../Config";
import { TAuthUser } from "../../../Interfaces/auth";

const userRegistration = catchAsync(async (req, res) => {
  const result = await AuthServices.userRegistrationIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, result } = await AuthServices.loginUser(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    secure: Config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: {
      ...result,
      token: accessToken,
    },
  });
});

const myProfile = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await AuthServices.getMyProfile(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await AuthServices.updateMyProfileIntoDB(user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});

export const AuthControllers = {
  userRegistration,
  userLogin,
  myProfile,
  updateMyProfile,
};
