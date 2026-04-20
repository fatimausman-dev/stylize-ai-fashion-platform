import { z } from "zod";

export const infoValidator = {
  body: z.object({
    returnPolicy: z.string().optional(),
    refund: z.string().optional(),
    shipping: z.string().optional(),
    shippingFee: z.coerce.number().optional(),    
  }),
};

export default infoValidator;
