import { Router } from "express";
import { databaseStatus } from "../db/connect.js";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  const db = databaseStatus();
  res.status(db === "connected" ? 200 : 503).json({ status: db === "connected" ? "ok" : "degraded", db });
});
