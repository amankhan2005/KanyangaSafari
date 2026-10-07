/** Form payloads sent to the Express API. Site content types live in src/data/types.ts. */

export type ProposalInput = {
  name: string;
  email: string;
  phone: string;
  services: string[];
  travelFrom: string;
  travelTo: string;
  travellers: string;
  message: string;
  company: string;
};

export type ItineraryInput = {
  name: string;
  email: string;
  phone: string;
  regions: string[];
  services: string[];
  budget: string;
  travellers: string;
  startDate: string;
  endDate: string;
  notes: string;
  company: string;
};

export type EtaInput = {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  arrivalDate: string;
  departureDate: string;
  travellers: string;
  notes: string;
  company: string;
};

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
};

export type SubmissionResult = { ok: true; id?: string; message: string };
