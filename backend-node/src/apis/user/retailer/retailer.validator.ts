import { z } from "zod";

export const infoValidator = {
  body: z.object({
    name: z.string().min(1).max(255),
    nic: z.string().regex(/^\d{13}$/),
    idDocFront: z.string().optional(),
    idDocBack: z.string().optional(),
    accountTitle: z.string().min(1).max(255),
    accountNo: z.string().regex(/^\d{16}$/),
    accountIban: z.string().regex(/^\d{13}$/),
    bankName: z.string().min(1).max(255),
    branchName: z.string().min(1).max(255),
    branchCode: z.string().min(3).max(7),
    bankCopy: z.string().optional(),
  }),
};


export const updateInfoValidator = {
  body: z.object({
    accountTitle: z.string().min(1).max(255),
    accountNo: z.string().regex(/^\d{16}$/),
    accountIban: z.string().regex(/^\d{13}$/),
    bankName: z.string().min(1).max(255),
    branchName: z.string().min(1).max(255),
    branchCode: z.string().min(3).max(7),
    bankCopy: z.string().optional(),
  }),
};
