import { VerificationType } from "@prisma/client";
import createError from "http-errors";

import { createEndpoint } from "@/commons";
import { config } from "@/config";
import { prisma } from "@/database";
import { jwtSign } from "@/services/jwt";

import {
  deleteCode,
  sendVerificationCode,
  verifyCode,
  verifyUser,
} from "./buyer.service";
import {
  loginValidator,
  postAuthCodeValidator,
  preSignUpValidator,
} from "./buyer.validator";

/// Get login details

export const getLoginDetails = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      password: true,
      email: true,
      phone: true,
    },
  });

  res.json({
    result: user,
  });
});

/// Sign up

export const signUp = createEndpoint(preSignUpValidator, async (req, res) => {
  const { username, email, phone, password } = req.body;
  
  const existingUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (existingUsername) throw createError(409, "Username already exists");

  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail && existingEmail.isVerified)
    throw createError(409, "Email already exists");
  else if (existingEmail && !existingEmail.isVerified) {
    await prisma.user.update({
      where: {
        id: existingEmail.id,
      },
      data: {
        username,
        phone,
        password,
      },
    });
    const user = await prisma.user.findUnique({
      where: {
        id: existingEmail.id,
      },
      include: {
        VerificationCode: {
          where: {
            verificationType: VerificationType.SIGN_UP,
          },
        },
      },
    });
    if (!user) throw createError(404, "User not found");
    
    await sendVerificationCode(existingEmail.id, VerificationType.SIGN_UP, 
      user.VerificationCode[0]
      ? user.VerificationCode[0].id
      : undefined);

    const { sessionToken, tokenExpiresIn } = jwtSign({
      userId: existingEmail.id,
      jwtSecretKey: config.JWT_SESSION_SECRET_KEY,
      expiresIn: 64000,
    });

    res.json({
      result: {
        id: existingEmail.id,
        sessionToken,
        tokenExpiresIn,
      },
    });
  } else {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        phone,
        password,
        role: "BUYER",
      },
    });
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        VerificationCode: {
          where: {
            verificationType: VerificationType.SIGN_UP,
          },
        },
      },
    });
    if (!userData) throw createError(404, "User not found");
    
    await sendVerificationCode(userData.id, VerificationType.SIGN_UP, 
      userData.VerificationCode[0]
      ? userData.VerificationCode[0].id
      : undefined);

    const { sessionToken, tokenExpiresIn } = jwtSign({
      userId: user.id,
      jwtSecretKey: config.JWT_SESSION_SECRET_KEY,
      expiresIn: 64000,
    });

    res.json({
      result: {
        id: user.id,
        sessionToken,
        tokenExpiresIn,
      },
    });
  }
});

export const updateLoginDetails = createEndpoint(
  preSignUpValidator,
  async (req, res) => {
    const { userId } = req;
    const { username, email, phone, password } = req.body;

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail && existingEmail.id !== userId)
      throw createError(409, "Email already exists");

    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUsername && existingUsername.id !== userId)
      throw createError(409, "Username already exists");

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        phone,
        password,
      },
    });

    res.json({
      result: user,
    });
  }
);

/// Resend verification code

export const resendCode = createEndpoint({}, async (req, res) => {
  const { userId } = req;
  console.log(userId);
  // Get the user's email from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });

  // Check if the user exists
  if (!user) throw createError(404, "User not found");
  console.log(user.id);

  const existingCode = await prisma.verificationCode.findUnique({
    where: {
      userId: user.id,
    },
  });
  // Send the verification code to the user's email
  await sendVerificationCode(user.id, VerificationType.SIGN_UP, existingCode!.id);
  
  res.json({
    result: "Verification code sent successfully",
  });
});

/// Verify the code

export const codeVerify = createEndpoint(
  postAuthCodeValidator,
  async (req, res) => {
    const { userId } = req;
    const { code, codeType } = req.body;

    const userData = await verifyCode(userId, codeType, code);
    if (!userData) throw createError(401, "Invalid verification code");
    if (userData && !userData.isVerified) await verifyUser(userId);
    await deleteCode(userId, codeType, code);

    const { sessionToken } = jwtSign({
      userId: userData.id,
      jwtSecretKey: config.JWT_SESSION_SECRET_KEY,
      expiresIn: 64000,
    });

    res.json({
      result: {
        userId: userData.id,
        sessionToken,
      },
    });
  }
);

/// Sign in

export const signIn = createEndpoint(loginValidator, async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw createError(404, "User not found");

  if (user.password !== password) throw createError(404, "Invalid Password");

  if (!user.isVerified) throw createError(404, "User is not verified");

  if (user.isRestricted) throw createError(404, "Your account access has been restricted");

  const { sessionToken, tokenExpiresIn } = jwtSign({
    userId: user.id,
    jwtSecretKey: config.JWT_SESSION_SECRET_KEY,
    expiresIn: 64000,
  });

  // create entry in the buyer table if not exists
  let buyer = await prisma.buyer.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!buyer) {
    buyer = await prisma.buyer.create({
      data: {
        userId: user.id,
        firstName: "", 
        lastName: "",
        address: "",
        city: "",
        country: "",
        zip: "",
      },
    });
  }

  res.json({
    result: {
      userId: user.id,
      sessionToken,
      tokenExpiresIn,
      buyer
    },
  });
});

/// Delete account

export const deleteAccount = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  res.json({
    result: "Account deleted successfully",
  });
});