import { VerificationType } from "@prisma/client";
import { z } from "zod";

export const preSignUpValidator = {
  body: z.object({
    username: z.string().trim().min(1),
    email: z.string().email(),
    phone: z.string().regex(/^\d{11}$/),
    password: z.string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
    // verificationCode: z.string().regex(/^\d{6}$/)
  }),
};

export const loginValidator = {
  body: z.object({
    username: z.string().trim().min(1),
    password: z.string().min(8),
  }),
};

export const postAuthCodeValidator = {
  body: z.object({
    code: z.string().trim().length(6),
    codeType: z.nativeEnum(VerificationType),
  }),
};


export default preSignUpValidator;
