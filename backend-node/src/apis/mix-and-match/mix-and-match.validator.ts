import { z } from "zod";

export const idValidator = {
  params: z.object({
    id: z.coerce.number(),
  }),
};

