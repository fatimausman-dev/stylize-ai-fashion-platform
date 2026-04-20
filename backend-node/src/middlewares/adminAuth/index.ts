import basicAuth from "basic-auth";
import { NextFunction, Response, Request } from "express";
import createError from "http-errors";

import { config } from "@/config";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = basicAuth(req);
    if (
      auth?.name !== config.ADMIN_AUTH_NAME &&
      auth?.pass !== config.ADMIN_AUTH_PASSWORD
    ) {
      res.set("WWW-Authenticate", "Basic realm=Authorization Required");
      throw createError(401, "Not authenticated");
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default adminAuth;
