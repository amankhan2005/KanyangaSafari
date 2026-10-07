import { Media } from "@/components/Media";
import { LineLink } from "@/components/LineLink";
import { Honeypot, SentNotice, SubmitRow, TextArea, TextInput } from "@/components/Form";
import { container, label, type } from "@/components/ui";
import { media } from "@/data/images";
import { routes } from "@/data/navigation";
import { contact, meta, proposal } from "@/data/site";
import { useForm } from "@/hooks/useForm";
import { usePageMeta } from "@/hooks/usePageMeta";
import { api } from "@/services/api";
import type { ContactInput } from "@/services/types";
import { rules } from "@/utils/validation";

const initial: ContactInput = { name: "", email: "", phone: "", message: "", company: "" };

export default function ContactPage() {
  usePageMeta(meta.contact.title, meta.contact.description);
  const form = useForm(
    initial,
    (v) => ({
      name: rules.name(v.name),
      email: rules.email(v.email),
      phone: rules.phone(v.phone),
      message: rules.minLength(v.message, 10, "Write a short message (10 characters or more)."),
    }),
    api.submitContact,
  );
  const { values, errors } = form;

  const rows = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Phone", value: contact.phone, href: contact.phoneHref },
    { label: "Location", value: contact.location },
  ];

  return (
    <div className="page-in">
      <section className={`${container} grid gap-14 pb-[clamp(6rem,12vw,10rem)] pt-[calc(72px+clamp(4rem,9vw,7.5rem))] lg:grid-cols-12`}>
        <div className="flex flex-col lg:col-span-6">
          <p className={label} data-reveal>
            {contact.location}
          </p>
          <h1 className={`mt-6 ${type.display}`} data-reveal>
            Contact Us
          </h1>

          <dl className="mt-[clamp(3rem,7vw,5.5rem)] border-t border-black">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-2 border-b border-black py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:py-7" data-reveal>
                <dt className={label}>{r.label}</dt>
                <dd className="min-w-0 font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.2] [overflow-wrap:anywhere]">
                  {r.href ? (
                    <a href={r.href} className="select-all decoration-1 underline-offset-[6px] hover:underline">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6" data-reveal>
            <LineLink to="#enquiry">{contact.enquire}</LineLink>
            <LineLink to={routes.proposal}>{proposal.cta}</LineLink>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Media slot={media.contact} className="aspect-[4/5] w-full lg:sticky lg:top-28" />
        </div>
      </section>

      {/* Enquiry form — stored in MongoDB via POST /api/contact */}
      <section id="enquiry" className="scroll-mt-24 bg-black text-white" aria-labelledby="enquiry-title">
        <div className={`${container} grid gap-14 py-[clamp(6rem,12vw,10rem)] lg:grid-cols-12`}>
          <h2 id="enquiry-title" className={`${type.h2} lg:col-span-4`}>
            {contact.enquire}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {form.status === "success" ? (
              <div className="[&_*]:border-white">
                <SentNotice message={form.message} onReset={form.reset} resetLabel="Send another enquiry" />
              </div>
            ) : (
              <form ref={form.formRef} onSubmit={form.onSubmit} noValidate className="relative flex flex-col gap-10 [&_input]:border-white [&_textarea]:border-white">
                <Honeypot value={values.company} onChange={(v) => form.set("company", v)} />
                <div className="grid gap-10 sm:grid-cols-2">
                  <TextInput name="name" label="Name" required autoComplete="name" value={values.name} onChange={form.onChange} error={errors.name} />
                  <TextInput name="email" type="email" label="Email" required autoComplete="email" value={values.email} onChange={form.onChange} error={errors.email} />
                </div>
                <TextInput name="phone" type="tel" label="Phone" autoComplete="tel" value={values.phone} onChange={form.onChange} error={errors.phone} />
                <TextArea name="message" label="Message" required value={values.message} onChange={form.onChange} error={errors.message} />
                <SubmitRow label="Send enquiry" status={form.status} message={form.message} tone="dark" />
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
