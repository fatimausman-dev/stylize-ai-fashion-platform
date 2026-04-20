import { z } from "zod";

export const infoValidator = {
  body: z.object({
    phone: z.string(),
    email: z.string().email(),
    socials: z.array(z.string()),
  }),
};

export default infoValidator;
