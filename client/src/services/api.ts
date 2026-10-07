import { config } from "@/config/env";
import type { ContactInput, EtaInput, ItineraryInput, ProposalInput, SubmissionResult } from "./types";

/** An API failure with a user-readable message and, for validation errors, one message per field. */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields: Record<string, string> = {},
  ) {
    super(message);
  }
}

/**
 * The API is used for form submissions only. All site content — copy, services, team, gallery, images —
 * is static and imported from src/data.
 */
async function post(path: string, data: object): Promise<SubmissionResult> {
  if (import.meta.env.VITE_PREVIEW === "true") {
    const { previewSubmit } = await import("./previewData");
    return previewSubmit();
  }

  let res: Response;
  try {
    res = await fetch(`${config.apiUrl}/api${path}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new ApiError("We couldn't reach our server. Check your connection and try again.", 0);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(body.message ?? "Something went wrong. Please try again.", res.status, body.fields ?? {});
  }
  return body as SubmissionResult;
}

export const api = {
  submitProposal: (data: ProposalInput) => post("/proposals", data),
  submitItinerary: (data: ItineraryInput) => post("/itineraries", data),
  submitEta: (data: EtaInput) => post("/eta", data),
  submitContact: (data: ContactInput) => post("/contact", data),
};
