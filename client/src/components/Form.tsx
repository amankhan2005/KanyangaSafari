import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { buttonClass, label } from "./ui";

/** Editorial form controls: hairline underlines, small uppercase labels, clear sans-serif choices. */

type FieldProps = { id: string; label: string; error?: string; required?: boolean; children: ReactNode; className?: string };

export function Field({ id, label: text, error, required, children, className = "" }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={label}>
        {text}
        {required && <span aria-hidden> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="font-sans text-[13px] font-semibold">
          — {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-none border-0 border-b border-black bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-[border-width] focus:border-b-2 aria-[invalid=true]:border-b-2";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { name: string; label: string; error?: string };

export function TextInput({ name, label: text, error, required, className = "", ...rest }: InputProps) {
  const id = `f-${name}`;
  return (
    <Field id={id} label={text} error={error} required={required} className={className}>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        {...rest}
      />
    </Field>
  );
}

type AreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { name: string; label: string; error?: string };

export function TextArea({ name, label: text, error, required, className = "", ...rest }: AreaProps) {
  const id = `f-${name}`;
  return (
    <Field id={id} label={text} error={error} required={required} className={className}>
      <textarea
        id={id}
        name={name}
        rows={4}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} resize-y`}
        {...rest}
      />
    </Field>
  );
}

type Choice = { value: string; label: string };

/** A list of serif options with square (checkbox) or round (radio) markers. */
export function ChoiceList({
  name,
  legend,
  choices,
  selected,
  onToggle,
  type = "checkbox",
  error,
  required,
  columns = 2,
  legendHidden = false,
}: {
  name: string;
  legend: string;
  choices: Choice[];
  selected: string[];
  onToggle: (value: string) => void;
  type?: "checkbox" | "radio";
  error?: string;
  required?: boolean;
  columns?: 1 | 2 | 3;
  /** Keep the legend for screen readers when a visible heading already names the group. */
  legendHidden?: boolean;
}) {
  const cols = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <fieldset data-field={name} aria-invalid={error ? true : undefined} aria-describedby={error ? `f-${name}-error` : undefined}>
      <legend className={legendHidden ? "sr-only" : label}>
        {legend}
        {required && <span aria-hidden> *</span>}
      </legend>
      <div className={`mt-3 grid gap-x-10 border-t border-black ${cols}`}>
        {choices.map((c) => {
          const checked = selected.includes(c.value);
          return (
            <label key={c.value} className="flex cursor-pointer items-baseline gap-4 border-b border-black py-4">
              <input
                type={type}
                name={name}
                value={c.value}
                checked={checked}
                onChange={() => onToggle(c.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={`relative top-[1px] h-[14px] w-[14px] shrink-0 border border-black peer-checked:bg-black peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-black ${
                  type === "radio" ? "rounded-full" : ""
                }`}
              />
              <span className="font-sans text-[16px] leading-[1.4] peer-checked:font-semibold">{c.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`f-${name}-error`} className="mt-3 font-sans text-[13px] font-semibold">
          — {error}
        </p>
      )}
    </fieldset>
  );
}

/** Hidden spam trap: people never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

/** Submit button with the form's live status message. */
export function SubmitRow({
  label: text,
  status,
  message,
  tone = "light",
}: {
  label: string;
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
      <button type="submit" className={buttonClass(tone)} disabled={status === "submitting"} aria-disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : text}
      </button>
      <p role="status" aria-live="polite" className={`font-sans text-[15px] leading-snug ${status === "error" ? "font-semibold" : ""}`}>
        {message}
      </p>
    </div>
  );
}

/** Replaces a form once it has been sent. */
export function SentNotice({ message, onReset, resetLabel }: { message: string; onReset: () => void; resetLabel: string }) {
  return (
    <div role="status" className="border-y border-black py-14">
      <p className="max-w-2xl font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15]">{message}</p>
      <button type="button" onClick={onReset} className={`${label} mt-8 underline decoration-1 underline-offset-[6px]`}>
        {resetLabel}
      </button>
    </div>
  );
}
