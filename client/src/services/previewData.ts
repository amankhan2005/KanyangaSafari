/**
 * Design-review preview only (VITE_PREVIEW=true): forms validate but nothing is sent.
 * Tree-shaken out of production builds.
 */
import type { SubmissionResult } from "./types";

export async function previewSubmit(): Promise<SubmissionResult> {
  await new Promise((r) => setTimeout(r, 250));
  return { ok: true, message: "Preview only: this form is validated, but nothing was sent." };
}
