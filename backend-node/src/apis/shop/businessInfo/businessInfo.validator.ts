import { z } from "zod";

export const infoValidator = {
  body: z.object({
    name: z.string().min(1),
    description: z.string(),
    logo: z.string(),
    productsType: z.array(z.string()),
  }),
};

export default infoValidator;
