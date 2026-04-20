import createError from "http-errors";

import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import { emailValidator, resetPasswordValidator } from "./other.validator";


export const getMe = createEndpoint({}, async (req, res) => {
  const { userId } = req;
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  
  if (!userData) throw createError(404, "Not Found");
  if(!userData.isVerified) throw createError(401, "Not Verified");

  res.json({
    result: userData,
  });
});

export const forgotPassword = createEndpoint(emailValidator, async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw createError(404, "Not Found");
  if (!user.isVerified) throw createError(401, "Not Verified");

  res.json({
    result: user,
  });
});

export const resetPassword = createEndpoint(resetPasswordValidator, async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password,
    },
  });

  res.json({
    result: user,
  });
});

export default getMe;
