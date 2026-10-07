import { ChoiceList, Honeypot, SentNotice, SubmitRow, TextArea, TextInput } from "@/components/Form";
import { PageTitle } from "@/components/Sections";
import { container, label } from "@/components/ui";
import { serviceName, services } from "@/data/services";
import { itineraryBuilder, meta } from "@/data/site";
import { useForm } from "@/hooks/useForm";
import { usePageMeta } from "@/hooks/usePageMeta";
import { api } from "@/services/api";
import type { ItineraryInput } from "@/services/types";
import { rules, today } from "@/utils/validation";

const initial: ItineraryInput = {
  name: "",
  email: "",
  phone: "",
  regions: [],
  services: [],
  budget: "",
  travellers: "",
  startDate: "",
  endDate: "",
  notes: "",
  company: "",
};

/**
 * Itinerary builder: destinations (regions), activities (experiences), pricing (budget band), group and dates.
 * A live summary mirrors the choices; the request is stored in MongoDB via POST /api/itineraries.
 * No prices are calculated or invented — the budget bands are Kanyanga's existing ones.
 */
export default function ItineraryPage() {
  usePageMeta(meta.itinerary.title, meta.itinerary.description);
  const form = useForm(
    initial,
    (v) => ({
      regions: v.regions.length ? undefined : "Choose at least one region.",
      services: v.services.length ? undefined : "Choose at least one experience.",
      budget: v.budget ? undefined : "Choose a budget.",
      travellers: rules.travellers(v.travellers, true),
      endDate: rules.dateOrder(v.startDate, v.endDate, "End date must be after the start date."),
      name: rules.name(v.name),
      email: rules.email(v.email),
      phone: rules.phone(v.phone),
    }),
    api.submitItinerary,
  );
  const { values, errors } = form;

  const steps = [
    { n: "01", title: "Destinations" },
    { n: "02", title: "Experiences" },
    { n: "03", title: "Budget" },
    { n: "04", title: "Your group" },
    { n: "05", title: "Your details" },
  ];
  const stepHead = (i: number) => (
    <div className="mb-6 flex items-baseline gap-5">
      <span className={label}>{steps[i].n}</span>
      <h2 className="font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-tight">{steps[i].title}</h2>
    </div>
  );

  const summary: { label: string; value: string }[] = [
    { label: "Destinations", value: values.regions.join(", ") },
    { label: "Experiences", value: values.services.map(serviceName).join(", ") },
    { label: "Budget", value: values.budget },
    { label: "Travellers", value: values.travellers },
    { label: "Dates", value: [values.startDate, values.endDate].filter(Boolean).join(" → ") },
  ];

  return (
    <div className="page-in">
      <PageTitle eyebrow={itineraryBuilder.label} title={itineraryBuilder.title} intro={itineraryBuilder.description} />

      <section className={`${container} grid gap-16 pb-[clamp(6rem,12vw,10rem)] lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          {form.status === "success" ? (
            <SentNotice message={form.message} onReset={form.reset} resetLabel="Build another itinerary" />
          ) : (
            <form ref={form.formRef} onSubmit={form.onSubmit} noValidate className="relative flex flex-col gap-20">
              <Honeypot value={values.company} onChange={(v) => form.set("company", v)} />

              <div>
                {stepHead(0)}
                <ChoiceList
                  name="regions"
                  legend="Destinations"
                  legendHidden
                  required
                  columns={3}
                  choices={itineraryBuilder.regions.map((r) => ({ value: r, label: r }))}
                  selected={values.regions}
                  onToggle={(v) => form.toggle("regions", v)}
                  error={errors.regions}
                />
              </div>

              <div>
                {stepHead(1)}
                <ChoiceList
                  name="services"
                  legend="Experiences"
                  legendHidden
                  required
                  choices={services.map((s) => ({ value: s.slug, label: s.name }))}
                  selected={values.services}
                  onToggle={(v) => form.toggle("services", v)}
                  error={errors.services}
                />
              </div>

              <div>
                {stepHead(2)}
                <ChoiceList
                  name="budget"
                  legend="Budget"
                  legendHidden
                  type="radio"
                  required
                  columns={1}
                  choices={itineraryBuilder.budgets.map((b) => ({ value: b, label: b }))}
                  selected={values.budget ? [values.budget] : []}
                  onToggle={(v) => form.set("budget", v)}
                  error={errors.budget}
                />
              </div>

              <div>
                {stepHead(3)}
                <div className="grid gap-10 sm:grid-cols-3">
                  <TextInput name="travellers" type="number" inputMode="numeric" min={1} max={50} label="Travellers" required value={values.travellers} onChange={form.onChange} error={errors.travellers} />
                  <TextInput name="startDate" type="date" label="From" min={today()} value={values.startDate} onChange={form.onChange} error={errors.startDate} />
                  <TextInput name="endDate" type="date" label="To" min={values.startDate || today()} value={values.endDate} onChange={form.onChange} error={errors.endDate} />
                </div>
              </div>

              <div>
                {stepHead(4)}
                <div className="flex flex-col gap-10">
                  <div className="grid gap-10 sm:grid-cols-2">
                    <TextInput name="name" label="Name" required autoComplete="name" value={values.name} onChange={form.onChange} error={errors.name} />
                    <TextInput name="email" type="email" label="Email" required autoComplete="email" value={values.email} onChange={form.onChange} error={errors.email} />
                  </div>
                  <TextInput name="phone" type="tel" label="Phone" autoComplete="tel" value={values.phone} onChange={form.onChange} error={errors.phone} />
                  <TextArea name="notes" label="Notes" value={values.notes} onChange={form.onChange} error={errors.notes} />
                </div>
              </div>

              <SubmitRow label="Send my itinerary" status={form.status} message={form.message} />
            </form>
          )}
        </div>

        {/* Live summary */}
        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Your itinerary">
          <div className="bg-black p-8 text-white sm:p-10 lg:sticky lg:top-28">
            <p className={label}>Your itinerary</p>
            <dl className="mt-8 border-t border-white">
              {summary.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 border-b border-white py-5">
                  <dt className={`${label} text-[10px]`}>{row.label}</dt>
                  <dd className="font-sans text-[16px] leading-snug">{row.value || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>
    </div>
  );
}
