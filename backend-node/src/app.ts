import cors from "cors";
import { config as dotEnvConfig } from "dotenv";
import express from "express";
import morgan from "morgan";

import { api } from "@/apis";
import { createEndpoint } from "@/commons";
import { errorHandler, notFound404 } from "@/middlewares";

dotEnvConfig();

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get(
  "/",
  createEndpoint({}, (req, res) => {
    res.json({
      result: "Hello Stylize!",
    });
  })
);

app.use("/api/v1", api);

app.use(notFound404);
app.use(errorHandler);

export default app;
