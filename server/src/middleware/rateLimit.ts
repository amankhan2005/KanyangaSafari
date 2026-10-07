import rateLimit from "express-rate-limit";

/** Limits form submissions per IP. */
export const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "TooManyRequests", message: "Too many submissions from this connection. Please try again later." },
});
