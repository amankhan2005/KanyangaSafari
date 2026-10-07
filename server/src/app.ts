import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env.js";
import { submissionsRouter } from "./routes/submissions.js";
import { healthRouter } from "./routes/health.js";
import { errorHandler, notFound } from "./middleware/errors.js";

export function createApp() {
  const app = express();
  if (env.TRUST_PROXY) app.set("trust proxy", env.TRUST_PROXY);

  app.use(helmet());
  app.use(cors({ origin: env.clientOrigins, methods: ["GET", "POST"] }));
  app.use(express.json({ limit: "50kb" }));

  const api = express.Router();
  api.use(healthRouter);
  api.use(submissionsRouter);
  api.use(notFound);

  app.use("/api", api);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
