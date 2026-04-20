import { z } from "zod";

export const idValidator = {
  params: z.object({
    id: z.coerce.number(),
  }),
};

export const createValidator = {
  body: z.object({
    sku: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    stock: z.number().min(0).optional(),
    status: z.string(),
    selectedColors: z.array(z.string()).optional(),
    images: z.array(z.string().min(1)),
    sizeChart: z.string(),
    selectedSizes: z.array(z.string()),
    measures: z.string(),  
    category: z.string(),
    specifications: z.record(z.string()).optional()
  }),
};

export const updateValidator = {
  body: z.object({
    sku: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    stock: z.number().min(0).optional(),
    status: z.string(),
    selectedColors: z.array(z.string()).optional(),
    images: z.array(z.string().min(1)),
    sizeChart: z.string(),
    selectedSizes: z.array(z.string()),
    measures: z.string(),  
    category: z.string(),
  }),
  params: z.object({
    id: z.coerce.number(),
  }),
};

export default idValidator;