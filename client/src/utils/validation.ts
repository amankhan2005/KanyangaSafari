/** Client-side checks that mirror the API rules (server/src/validation/schemas.ts) for instant feedback. */
export type Errors<T> = Partial<Record<keyof T, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+0-9 ()-]*$/;

export const rules = {
  name: (v: string) => (v.trim().length < 2 ? "Enter your name." : undefined),
  email: (v: string) => (!emailPattern.test(v.trim()) ? "Enter a valid email address." : undefined),
  phone: (v: string) => (v && !phonePattern.test(v) ? "Enter a valid phone number." : undefined),
  travellers: (v: string, required: boolean) => {
    if (!v) return required ? "Enter the number of travellers." : undefined;
    const n = Number(v);
    if (!Number.isInteger(n) || n < 1) return "At least one traveller.";
    if (n > 50) return "For groups over 50, please contact us directly.";
    return undefined;
  },
  dateOrder: (start: string, end: string, message: string) => (start && end && end < start ? message : undefined),
  minLength: (v: string, n: number, message: string) => (v.trim().length < n ? message : undefined),
};

export const today = () => new Date().toISOString().slice(0, 10);
