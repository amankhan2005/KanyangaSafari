import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ApiError } from "@/services/api";
import type { SubmissionResult } from "@/services/types";
import type { Errors } from "@/utils/validation";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Form state, client-side validation, submission and server error mapping in one place.
 * `validate` mirrors the API's rules; the API remains the source of truth.
 */
export function useForm<T extends Record<string, string | string[]>>(
  initial: T,
  validate: (values: T) => Errors<T>,
  submit: (values: T) => Promise<SubmissionResult>,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(e.target.name as keyof T, e.target.value as T[keyof T]);

  const toggle = (key: keyof T, item: string) => {
    const list = (values[key] as string[]) ?? [];
    set(key, (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]) as T[keyof T]);
  };

  const focusFirstError = (errs: Errors<T>) => {
    const first = Object.keys(errs).find((k) => errs[k as keyof T]);
    if (!first) return;
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"], [data-field="${first}"] input`);
      el?.focus();
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const found = validate(values);
    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      focusFirstError(found);
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const result = await submit(values);
      setStatus("success");
      setMessage(result.message);
      setValues(initial);
      setErrors({});
    } catch (err) {
      const apiErr = err instanceof ApiError ? err : null;
      const fieldErrors = (apiErr?.fields ?? {}) as Errors<T>;
      setErrors(fieldErrors);
      setStatus("error");
      setMessage(apiErr?.message ?? "Something went wrong. Please try again.");
      focusFirstError(fieldErrors);
    }
  };

  const reset = () => {
    setStatus("idle");
    setMessage("");
  };

  return { values, errors, status, message, set, onChange, toggle, onSubmit, reset, formRef };
}
