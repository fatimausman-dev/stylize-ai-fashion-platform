import express from "express";

import { addContact, updateContact } from "./contact.controller";
import { isAuth } from "@/services";

const router = express.Router();

router.post('/', isAuth(), addContact);
router.put('/', isAuth(), updateContact);

export default router;