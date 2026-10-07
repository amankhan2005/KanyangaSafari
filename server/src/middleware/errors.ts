import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFound: RequestHandler = (req, res) => {
  res.status(404).json({ error: "NotFound", message: `No API route for ${req.method} ${req.originalUrl}` });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ error: "BadRequest", message: "The request body is not valid JSON." });
    return;
  }
  if (err?.type === "entity.too.large") {
    res.status(413).json({ error: "PayloadTooLarge", message: "The request is too large." });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "ServerError", message: "Something went wrong on our side. Please try again." });
};
