import { NextFunction, Request, Response } from "express";
import { PaginationOptions } from "./pagination.interface";
import { calculateSkip, validatePage, validateTake } from "./pagination.utils";

export const PaginationMiddleware = (
  req: Request & { pagination: PaginationOptions },
  _res: Response,
  next: NextFunction,
) => {
  const page = validatePage(+req.query.page);
  const take = validateTake(+req.query.take);
  const skip = calculateSkip(page, take);

  req.pagination = {
    page,
    take,
    skip,
  };

  next();
};
