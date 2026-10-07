import { Honeypot, SentNotice, SubmitRow, TextArea, TextInput } from "@/components/Form";
import { Media } from "@/components/Media";
import { PageTitle } from "@/components/Sections";
import { container } from "@/components/ui";
import { media } from "@/data/images";
import { brand, eta, meta } from "@/data/site";
import { useForm } from "@/hooks/useForm";
import { usePageMeta } from "@/hooks/usePageMeta";
import { api } from "@/services/api";
import type { EtaInput } from "@/services/types";
import { rules, today } from "@/utils/validation";

const initial: EtaInput = {
  fullName: "",
  email: "",
  phone: "",
  nationality: "",
  arrivalDate: "",
  departureDate: "",
  travellers: "",
  notes: "",
  company: "",
};

/** Travel ETA application — stored in MongoDB via POST /api/eta. No passport or payment data is collected. */
export default function EtaPage() {
  usePageMeta(meta.eta.title, meta.eta.description);
  const form = useForm(
    initial,
    (v) => ({
      fullName: rules.name(v.fullName),
      email: rules.email(v.email),
      phone: rules.phone(v.phone),
      nationality: rules.minLength(v.nationality, 2, "Enter your nationality."),
      arrivalDate: v.arrivalDate ? undefined : "Enter your arrival date.",
      departureDate: rules.dateOrder(v.arrivalDate, v.departureDate, "Departure must be after arrival."),
      travellers: rules.travellers(v.travellers, true),
    }),
    api.submitEta,
  );
  const { values, errors } = form;

  return (
    <div className="page-in">
      <PageTitle eyebrow={brand.name} title={eta.title} intro={eta.description} />

      <section className={`${container} grid gap-16 pb-[clamp(6rem,12vw,10rem)] lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          {form.status === "success" ? (
            <SentNotice message={form.message} onReset={form.reset} resetLabel="Submit another application" />
          ) : (
            <form ref={form.formRef} onSubmit={form.onSubmit} noValidate className="relative flex flex-col gap-10">
              <Honeypot value={values.company} onChange={(v) => form.set("company", v)} />
              <TextInput name="fullName" label="Full name" required autoComplete="name" value={values.fullName} onChange={form.onChange} error={errors.fullName} />
              <div className="grid gap-10 sm:grid-cols-2">
                <TextInput name="email" type="email" label="Email" required autoComplete="email" value={values.email} onChange={form.onChange} error={errors.email} />
                <TextInput name="phone" type="tel" label="Phone" autoComplete="tel" value={values.phone} onChange={form.onChange} error={errors.phone} />
              </div>
              <div className="grid gap-10 sm:grid-cols-2">
                <TextInput name="nationality" label="Nationality" required autoComplete="country-name" value={values.nationality} onChange={form.onChange} error={errors.nationality} />
                <TextInput name="travellers" type="number" inputMode="numeric" min={1} max={50} label="Travellers" required value={values.travellers} onChange={form.onChange} error={errors.travellers} />
              </div>
              <div className="grid gap-10 sm:grid-cols-2">
                <TextInput name="arrivalDate" type="date" label="Arrival" required min={today()} value={values.arrivalDate} onChange={form.onChange} error={errors.arrivalDate} />
                <TextInput name="departureDate" type="date" label="Departure" min={values.arrivalDate || today()} value={values.departureDate} onChange={form.onChange} error={errors.departureDate} />
              </div>
              <TextArea name="notes" label="Notes" value={values.notes} onChange={form.onChange} error={errors.notes} />
              <SubmitRow label="Submit application" status={form.status} message={form.message} />
            </form>
          )}
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <Media slot={media.eta} className="aspect-[4/5] w-full lg:sticky lg:top-28" />
        </aside>
      </section>
    </div>
  );
}
