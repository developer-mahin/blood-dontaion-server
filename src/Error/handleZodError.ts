import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../Interfaces/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  const errors = errorSources
    .map((item) => {
      return item.message;
    })
    .join(",")
    .replace(/,\s*/g, " ");

  return {
    statusCode,
    message: errors,
    errorSources,
  };
};

export default handleZodError;
