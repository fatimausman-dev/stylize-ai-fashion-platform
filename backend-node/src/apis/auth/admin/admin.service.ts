import { VerificationType } from "@prisma/client";
import createError from "http-errors";

import { prisma } from "@/database";
import { transporter } from "@/services";

export const generateExpiry = () => {
  const CODE_EXPIRY = 900000;
  const now = new Date();
  const expiryTime = new Date(now.getTime() + CODE_EXPIRY);
  return expiryTime;
};

export const generateCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

export const verifyCode = async (
  userId: string,
  verificationType: VerificationType,
  code: string
) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      VerificationCode: {
        where: {
          verificationType,
          code,
        },
      },
    },
  });

  if (userData && userData?.VerificationCode.length === 0)
    throw createError(401, "Invalid verification code!");
  else if (userData && userData?.VerificationCode[0]?.expiry < new Date())
    throw createError(401, "Verification code expired!");
  return userData;
};

export const deleteCode = async (
  userId: string,
  verificationType: VerificationType,
  code: string
) => {
  await prisma.verificationCode.deleteMany({
    where: {
      userId,
      verificationType,
      code,
    },
  });
};

export const sendVerificationCode = async (
  userId: string,
  verificationType: VerificationType,
  id = 0,
) => {
  const expiry = generateExpiry();
  const code = generateCode();

  await prisma.verificationCode.upsert({
    where: { id },
    create: {
      code,
      userId,
      verificationType,
      expiry,
    },
    update: {
      code,
      expiry,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });


  await transporter.sendMail({
    from: `Stylize <stylizemall@gmail.com>`,
    to: user?.email,
    subject: "Verification Code",
    html: `<p>Your verification code is <b>${code}</b></p>`,
  });
};

export const verifyUser = async (userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isVerified: true,
    },
  });
};

export default sendVerificationCode;
