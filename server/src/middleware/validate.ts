import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod";

/** Validates and normalises req.body. Responds 422 with one message per field on failure. */
export const validateBody =
  (schema: ZodTypeAny): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      const fields: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fields[key]) fields[key] = issue.message;
      }
      res.status(422).json({ error: "ValidationError", message: "Please check the highlighted fields.", fields });
      return;
    }
    req.body = result.data;
    next();
  };

/** Spam trap: a hidden "company" field that people never see or fill. Bots that fill it get a quiet success. */
export const honeypot: RequestHandler = (req, res, next) => {
  if (typeof req.body?.company === "string" && req.body.company.trim() !== "") {
    res.status(201).json({ ok: true });
    return;
  }
  if (req.body && typeof req.body === "object") delete req.body.company;
  next();
};
