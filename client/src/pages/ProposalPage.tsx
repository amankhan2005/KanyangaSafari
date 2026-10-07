import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChoiceList, Honeypot, SentNotice, SubmitRow, TextArea, TextInput } from "@/components/Form";
import { Media } from "@/components/Media";
import { PageTitle } from "@/components/Sections";
import { container, label } from "@/components/ui";
import { media } from "@/data/images";
import { services } from "@/data/services";
import { brand, contact, meta, proposal } from "@/data/site";
import { useForm } from "@/hooks/useForm";
import { usePageMeta } from "@/hooks/usePageMeta";
import { api } from "@/services/api";
import type { ProposalInput } from "@/services/types";
import { rules, today } from "@/utils/validation";

const initial: ProposalInput = {
  name: "",
  email: "",
  phone: "",
  services: [],
  travelFrom: "",
  travelTo: "",
  travellers: "",
  message: "",
  company: "",
};

/** Proposal request — stored in MongoDB via POST /api/proposals. Accepts ?service=<slug> to preselect an experience. */
export default function ProposalPage() {
  usePageMeta(meta.proposal.title, meta.proposal.description);
  const [params] = useSearchParams();
  const form = useForm(
    initial,
    (v) => ({
      name: rules.name(v.name),
      email: rules.email(v.email),
      phone: rules.phone(v.phone),
      travellers: rules.travellers(v.travellers, false),
      travelTo: rules.dateOrder(v.travelFrom, v.travelTo, "End date must be after the start date."),
    }),
    api.submitProposal,
  );
  const { values, errors } = form;

  const preselect = params.get("service");
  useEffect(() => {
    if (preselect && services.some((s) => s.slug === preselect) && !values.services.includes(preselect)) {
      form.set("services", [preselect]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselect]);

  return (
    <div className="page-in">
      <PageTitle eyebrow={brand.name} title={proposal.title} />

      <section className={`${container} grid gap-16 pb-[clamp(6rem,12vw,10rem)] lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          {form.status === "success" ? (
            <SentNotice message={form.message} onReset={form.reset} resetLabel="Make another proposal" />
          ) : (
            <form ref={form.formRef} onSubmit={form.onSubmit} noValidate className="relative flex flex-col gap-12">
              <Honeypot value={values.company} onChange={(v) => form.set("company", v)} />

              <ChoiceList
                name="services"
                legend="Safari experiences"
                choices={services.map((s) => ({ value: s.slug, label: s.name }))}
                selected={values.services}
                onToggle={(v) => form.toggle("services", v)}
                error={errors.services}
              />

              <div className="grid gap-10 sm:grid-cols-3">
                <TextInput name="travelFrom" type="date" label="From" min={today()} value={values.travelFrom} onChange={form.onChange} error={errors.travelFrom} />
                <TextInput name="travelTo" type="date" label="To" min={values.travelFrom || today()} value={values.travelTo} onChange={form.onChange} error={errors.travelTo} />
                <TextInput name="travellers" type="number" inputMode="numeric" min={1} max={50} label="Travellers" value={values.travellers} onChange={form.onChange} error={errors.travellers} />
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <TextInput name="name" label="Name" required autoComplete="name" value={values.name} onChange={form.onChange} error={errors.name} />
                <TextInput name="email" type="email" label="Email" required autoComplete="email" value={values.email} onChange={form.onChange} error={errors.email} />
              </div>
              <TextInput name="phone" type="tel" label="Phone" autoComplete="tel" value={values.phone} onChange={form.onChange} error={errors.phone} />
              <TextArea name="message" label="Message" value={values.message} onChange={form.onChange} error={errors.message} />

              <SubmitRow label={proposal.cta} status={form.status} message={form.message} />
            </form>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <Media slot={media.proposal} className="aspect-[4/5] w-full" />
            <div className={`${label} mt-8 flex flex-col gap-3`}>
              <span className="select-all">{contact.email}</span>
              <span className="select-all">{contact.phone}</span>
              <span>{contact.location}</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
