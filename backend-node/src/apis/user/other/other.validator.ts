import { z } from "zod";

export const postSignUpValidator = {
  body: z.object({
    email: z.string().email(),
    username: z.string().trim().min(1),
    phone: z.string().regex(/^\d{11}$/),
    password: z.string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  }),
};

export const emailValidator = {
  body: z.object({
    email: z.string().email(),
  }),
};  

export const resetPasswordValidator = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  }),
};

export default postSignUpValidator;
