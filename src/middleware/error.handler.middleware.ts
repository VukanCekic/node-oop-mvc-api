import { Request, Response, NextFunction } from "express";
import { CustomError } from "../exceptions/custom-error.exception";

const handleError = (
  error: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = error;

  if (!(error instanceof CustomError)) {
    customError = new CustomError(error.message);
  }

  res
    .status((customError as CustomError).status)
    .render("error", { customError: customError });
};

export default handleError;
