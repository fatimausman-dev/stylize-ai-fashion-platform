/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { NextFunction, Response, Request } from "express";
import createError from "http-errors";
import jwt, { verify } from "jsonwebtoken";

import { config } from "@/config";
import { prisma } from "@/database";
import { Token } from "@/interfaces";

export const isAuth =
  (jwtSecretKey = config.JWT_SESSION_SECRET_KEY) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.get("Authorization")?.split(" ")?.[1] ||
        (req.query.token as string);
      if (token === undefined) {
        throw createError(401, "Not authenticated");
      }

      let decodedToken: Token;
      try {
        decodedToken = verify(token, jwtSecretKey) as Token;
      } catch {
        throw createError(401, "Not authenticated");
      }

      if (decodedToken === undefined) {
        throw createError(401, "Not authenticated");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.userId,
        },
      });
      if (!user) throw createError(404, "Not Found");

      req.token = token;
      req.userId = user.id;

      next();
    } catch (err) {
      next(err);
    }
  };

export const jwtSign = ({
  userId,
  jwtSecretKey,
  isRefresh,
  expiresIn,
  refreshExpiresIn = Infinity,
}: {
  userId: string;
  jwtSecretKey: string;
  isRefresh?: boolean;
  expiresIn: number;
  refreshExpiresIn?: number;
}) => {
  const sessionToken = jwt.sign({ userId }, jwtSecretKey, {
    expiresIn: `${expiresIn.toString()}s`,
    algorithm: "HS256",
    subject: userId,
  });
  const buffer = 5 * 60;

  if (isRefresh) {
    const refreshToken = jwt.sign({ userId }, config.JWT_REFRESH_SECRET_KEY, {
      expiresIn: `${refreshExpiresIn.toString()}s`,
      algorithm: "HS256",
    });

    return { sessionToken, refreshToken, tokenExpiresIn: expiresIn - buffer };
  }
  return { sessionToken, tokenExpiresIn: expiresIn - buffer };
};

export default isAuth;
