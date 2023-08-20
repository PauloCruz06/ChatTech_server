import { Request, Response, NextFunction } from "express";
import { errorData } from "../types/errorType";

export function errorHandler(
  error: errorData,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.code) {
    const errorCode = errorByCode(error);
    return res.status(errorCode).send(error.message);
  }
}

function errorByCode(type: errorData) {
  if (type.code == 'NotFound') return (404);
  if (type.code == 'UnprocessabeEntity') return (422);
  if (type.code == 'Conflict') return (409);
  if (type.code == 'Unauthorized') return (401);
  return (500);
}