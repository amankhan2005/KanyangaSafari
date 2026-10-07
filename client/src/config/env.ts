/** Runtime configuration from Vite env vars (see client/.env.example). No secrets live in the client. */
export const config = {
  apiUrl: (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, ""),
  isPreview: import.meta.env.VITE_PREVIEW === "true",
};
