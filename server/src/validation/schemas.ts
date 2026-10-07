import { z } from "zod";
import { options } from "../config/options.js";

const name = z.string({ required_error: "Enter your name." }).trim().min(2, "Enter your name.").max(120, "Name is too long.");
const email = z.string({ required_error: "Enter your email address." }).trim().email("Enter a valid email address.").max(200);
const phone = z
  .string()
  .trim()
  .max(40, "Phone number is too long.")
  .regex(/^[+0-9 ()-]*$/, "Enter a valid phone number.")
  .optional()
  .default("");
const text = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters.`).optional().default("");
const optionalDate = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : v),
  z.coerce.date({ invalid_type_error: "Enter a valid date." }).optional(),
);
const requiredDate = (message: string) =>
  z.preprocess((v) => (v === "" || v === null ? undefined : v), z.coerce.date({ required_error: message, invalid_type_error: message }));
const travellers = z.coerce
  .number({ invalid_type_error: "Enter the number of travellers." })
  .int("Enter a whole number.")
  .min(1, "At least one traveller.")
  .max(50, "For groups over 50, please contact us directly.");
const oneOf = (list: string[], message: string) => z.string().refine((v) => list.includes(v), message);
const serviceList = z.array(oneOf(options.services, "Choose from the listed experiences.")).max(20).optional().default([]);

const after = (start: Date | undefined, end: Date | undefined) => !start || !end || end >= start;

export const proposalSchema = z
  .object({
    name,
    email,
    phone,
    services: serviceList,
    travelFrom: optionalDate,
    travelTo: optionalDate,
    travellers: travellers.optional(),
    message: text(4000),
  })
  .refine((d) => after(d.travelFrom, d.travelTo), { path: ["travelTo"], message: "End date must be after the start date." });

export const itinerarySchema = z
  .object({
    name,
    email,
    phone,
    regions: z.array(oneOf(options.regions, "Choose a listed region.")).min(1, "Choose at least one region."),
    services: serviceList.refine((v) => v.length > 0, "Choose at least one experience."),
    budget: oneOf(options.budgets, "Choose a budget."),
    travellers,
    startDate: optionalDate,
    endDate: optionalDate,
    notes: text(4000),
  })
  .refine((d) => after(d.startDate, d.endDate), { path: ["endDate"], message: "End date must be after the start date." });

export const etaSchema = z
  .object({
    fullName: name,
    email,
    phone,
    nationality: z.string({ required_error: "Enter your nationality." }).trim().min(2, "Enter your nationality.").max(80),
    arrivalDate: requiredDate("Enter your arrival date."),
    departureDate: optionalDate,
    travellers,
    notes: text(2000),
  })
  .refine((d) => after(d.arrivalDate, d.departureDate), { path: ["departureDate"], message: "Departure must be after arrival." });

export const contactSchema = z.object({
  name,
  email,
  phone,
  message: z.string({ required_error: "Write a short message." }).trim().min(10, "Write a short message (10 characters or more).").max(4000),
});
