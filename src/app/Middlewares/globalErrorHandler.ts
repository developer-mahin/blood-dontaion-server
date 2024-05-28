import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import handleZodError from "../../Error/handleZodError";
import { TErrorSources } from "../../Interfaces/error";
import Config from "../Config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;

  let message = error.message || "Something went wrong!";
  let errorDetails: TErrorSources = [
    {
      field: "",
      message: message,
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorSources;
  }

  if (error.statusCode === 403 || error.statusCode === 401) {
    errorDetails = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack: Config.node_env === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
