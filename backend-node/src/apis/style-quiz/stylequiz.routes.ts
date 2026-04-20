import express from "express";

import { isAuth } from "@/services";
import { submitQuiz } from "./stylequiz.controller";

const router = express.Router();


router.post("/", isAuth(), submitQuiz);


export default router;
