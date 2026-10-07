import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Form choice values shared with the client: regions, budget bands, interests, and the service slugs
 * the proposal and itinerary forms may send (must match client/src/data/services.ts).
 */
type Options = { regions: string[]; budgets: string[]; interests: string[]; services: string[] };

const file = fileURLToPath(new URL("../../../shared/options.json", import.meta.url));
export const options: Options = JSON.parse(readFileSync(file, "utf8"));
