import { Router, type RequestHandler } from "express";
import type { Model } from "mongoose";
import { honeypot, validateBody } from "../middleware/validate.js";
import { submissionLimiter } from "../middleware/rateLimit.js";
import { contactSchema, etaSchema, itinerarySchema, proposalSchema } from "../validation/schemas.js";
import { ContactEnquiryModel, EtaApplicationModel, ItineraryRequestModel, ProposalModel } from "../models/submissions.js";

export const submissionsRouter = Router();

/**
 * Form submissions only. Site content (services, team, gallery, copy, images) is static in the React app;
 * service slugs sent by the forms are validated against shared/options.json.
 */
const save =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (model: Model<any>, message: string): RequestHandler =>
  async (req, res) => {
    const doc = await model.create(req.body);
    res.status(201).json({ ok: true, id: String(doc._id), message });
  };

submissionsRouter.post(
  "/proposals",
  submissionLimiter,
  honeypot,
  validateBody(proposalSchema),
  save(ProposalModel, "Your proposal request has been received. We will be in touch soon."),
);

submissionsRouter.post(
  "/itineraries",
  submissionLimiter,
  honeypot,
  validateBody(itinerarySchema),
  save(ItineraryRequestModel, "Your itinerary has been received. We will be in touch soon."),
);

submissionsRouter.post(
  "/eta",
  submissionLimiter,
  honeypot,
  validateBody(etaSchema),
  save(EtaApplicationModel, "Your ETA application has been received. We will be in touch soon."),
);

submissionsRouter.post(
  "/contact",
  submissionLimiter,
  honeypot,
  validateBody(contactSchema),
  save(ContactEnquiryModel, "Thank you for your enquiry. We will be in touch soon."),
);
