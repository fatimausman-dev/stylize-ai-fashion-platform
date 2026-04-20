import { z } from "zod";

export const idValidator = {
  params: z.object({
    id: z.coerce.number(),
  }),
};

export const updateValidator = {
  body: z.object({
    name: z.string().min(1),
  }),
  params: z.object({
    id: z.coerce.number(),
  }),
};

export const createValidator = {
  body: z.object({
    name: z.string().min(1),
  }),
};

export default idValidator;
