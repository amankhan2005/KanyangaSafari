import { Schema, model } from "mongoose";

/**
 * Form submissions. Each is stored with a status so the team can work through them.
 * Note: no passport or payment data is collected anywhere.
 */
const status = { type: String, enum: ["new", "in-progress", "closed"], default: "new" };
const contactFields = {
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, default: "", trim: true },
};

export const ProposalModel = model(
  "Proposal",
  new Schema(
    {
      ...contactFields,
      services: { type: [String], default: [] },
      travelFrom: { type: Date },
      travelTo: { type: Date },
      travellers: { type: Number, min: 1 },
      message: { type: String, default: "", trim: true },
      status,
    },
    { timestamps: true },
  ),
);

export const ItineraryRequestModel = model(
  "ItineraryRequest",
  new Schema(
    {
      ...contactFields,
      regions: { type: [String], default: [] },
      services: { type: [String], default: [] },
      budget: { type: String, required: true },
      travellers: { type: Number, required: true, min: 1 },
      startDate: { type: Date },
      endDate: { type: Date },
      notes: { type: String, default: "", trim: true },
      status,
    },
    { timestamps: true },
  ),
);

export const EtaApplicationModel = model(
  "EtaApplication",
  new Schema(
    {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, default: "", trim: true },
      nationality: { type: String, required: true, trim: true },
      arrivalDate: { type: Date, required: true },
      departureDate: { type: Date },
      travellers: { type: Number, required: true, min: 1 },
      notes: { type: String, default: "", trim: true },
      status,
    },
    { timestamps: true },
  ),
);

export const ContactEnquiryModel = model(
  "ContactEnquiry",
  new Schema(
    {
      ...contactFields,
      message: { type: String, required: true, trim: true },
      status,
    },
    { timestamps: true },
  ),
);
