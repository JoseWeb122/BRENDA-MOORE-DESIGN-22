import { useId, useState, type FormEvent } from "react";
import { bookingInfo, eventTypeOptions } from "@/lib/data";
import { SectionHeading, SectionShell } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { IconCalendar, IconCheck, IconMail, IconMapPin } from "./ui/Icons";
import { useSmoothScrollTo } from "@/lib/hooks";

type Fields = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  details: string;
  referral: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initialFields: Fields = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  details: "",
  referral: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^[+()\-.\s\d]{7,24}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2) errors.name = "Please enter your full name.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address, e.g. name@example.com.";

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number, or leave this field blank.";

  if (!values.eventType) errors.eventType = "Please select the type of event.";

  if (values.eventDate) {
    const chosen = new Date(values.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(chosen.getTime())) errors.eventDate = "Please enter a valid date.";
    else if (chosen < today) errors.eventDate = "Please choose a date in the future.";
  }

  if (values.guests.trim()) {
    const guests = Number(values.guests);
    if (!Number.isFinite(guests) || guests < 1 || guests > 100000)
      errors.guests = "Please enter the expected number of guests.";
  }

  if (!values.details.trim()) errors.details = "Please tell Brenda a little about the performance.";
  else if (values.details.trim().length < 20)
    errors.details = "Please add a little more detail (at least 20 characters).";

  return errors;
}

const infoIcons = {
  mail: IconMail,
  calendar: IconCalendar,
  map: IconMapPin,
};

export function Contact() {
  const formId = useId();
  const scrollTo = useSmoothScrollTo();
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (touched[key]) {
      setErrors(validate({ ...fields, [key]: value }));
    }
  };

  const blur = (key: keyof Fields) => {
    setTouched((current) => ({ ...current, [key]: true }));
    setErrors(validate(fields));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      eventType: true,
      eventDate: true,
      location: true,
      guests: true,
      details: true,
      referral: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      const element = document.getElementById(`${formId}-${firstKey}`);
      element?.focus();
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    /* Front-end only: simulates the request round-trip. */
    window.setTimeout(() => setStatus("success"), 1300);
  };

  const resetForm = () => {
    setFields(initialFields);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const fieldClass = (key: keyof Fields) =>
    `w-full border bg-espresso-800/60 px-4 py-3.5 font-sans text-[0.92rem] font-light text-ivory placeholder:text-ivory/25 transition-colors duration-400 focus:bg-espresso-800 focus:outline-none focus:ring-0 ${
      errors[key] && touched[key]
        ? "border-red-400/70 focus:border-red-400"
        : "border-ivory/15 focus:border-gold"
    }`;

  const labelClass = "u-label mb-2.5 block text-ivory/45";
  const errorClass = "mt-2 block font-sans text-[10.5px] tracking-[0.06em] text-red-300/90";
  const required = <span className="text-gold">*</span>;

  return (
    <SectionShell id="contact" className="bg-espresso">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_80%_0%,rgba(198,161,91,0.1),transparent_65%)]"
      />

      <div className="relative grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* ---------------- Left: booking info ---------------- */}
        <div>
          <Reveal variant="fade" className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/70" />
            <span className="u-label text-gold">Booking &amp; Contact</span>
          </Reveal>

          <SectionHeading className="mt-6" size="lg">
            Let&apos;s Create
            <br />
            Something <span className="u-italic text-gold">Memorable.</span>
          </SectionHeading>

          <Reveal variant="up" delay={170} className="mt-8 max-w-[42ch]">
            <p className="font-sans text-[0.98rem] font-light leading-[1.95] text-ivory/60">
              Tell Brenda about your event and what you have in mind. Every inquiry is
              read personally, and you will receive a reply as soon as possible.
            </p>
          </Reveal>

          <ul className="mt-12 flex flex-col gap-8">
            {bookingInfo.map((item, index) => {
              const Glyph = infoIcons[item.icon];
              return (
                <Reveal as="li" variant="up" delay={220 + index * 90} key={item.label}>
                  <div className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/35 text-gold">
                      <Glyph size={19} />
                    </span>
                    <div>
                      <p className="u-label text-ivory/40">{item.label}</p>
                      <p className="mt-2.5 font-sans text-[0.95rem] tracking-[0.03em] text-ivory/90">
                        {item.value}
                      </p>
                      <p className="mt-1.5 font-sans text-[0.83rem] font-light leading-[1.7] text-ivory/45">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal variant="fade" delay={520} className="mt-12">
            <button
              type="button"
              onClick={() => scrollTo("#live")}
              className="group inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:text-gold-200"
            >
              Review performance formats
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden="true">
                  <path d="M0 4h24M20 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </Reveal>
        </div>

        {/* ---------------- Right: form ---------------- */}
        <Reveal variant="up" delay={120} className="relative">
          <div className="border border-gold/20 bg-gradient-to-br from-espresso-800/85 via-espresso/95 to-espresso p-6 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)] sm:p-9 lg:p-11">
            {status === "success" ? (
              <div className="flex min-h-[30rem] flex-col items-center justify-center text-center">
                <span className="modal-panel flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold">
                  <IconCheck size={34} />
                </span>
                <h3 className="u-display modal-panel mt-8 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-tight text-ivory">
                  Thank you for reaching out.
                </h3>
                <p className="modal-panel mt-5 max-w-[38ch] font-sans text-[0.95rem] font-light leading-[1.9] text-ivory/60">
                  Your inquiry has been received. Brenda will be in touch shortly — and
                  thank you for thinking of her for your event.
                </p>
                <div className="modal-panel mt-9 flex flex-col gap-4 sm:flex-row">
                  <Button variant="outline" onClick={resetForm}>
                    Send Another Inquiry
                  </Button>
                  <Button onClick={() => { resetForm(); scrollTo("#music"); }}>
                    Explore the Music
                  </Button>
                </div>
                <p className="mt-8 font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/30">
                  Front-end prototype — no message has actually been sent.
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} aria-label="Performance inquiry form">
                <p className="u-label text-gold">Performance Inquiry</p>
                <h3 className="u-display mt-4 text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-ivory">
                  Tell Brenda about your event
                </h3>

                <div className="mt-9 grid gap-6 sm:grid-cols-2">
                  {/* name */}
                  <div className="sm:col-span-1">
                    <label htmlFor={`${formId}-name`} className={labelClass}>
                      Name {required}
                    </label>
                    <input
                      id={`${formId}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={fields.name}
                      onChange={(event) => update("name", event.target.value)}
                      onBlur={() => blur("name")}
                      aria-required="true"
                      aria-invalid={Boolean(errors.name && touched.name)}
                      aria-describedby={errors.name && touched.name ? `${formId}-name-error` : undefined}
                      className={fieldClass("name")}
                    />
                    {errors.name && touched.name && (
                      <span id={`${formId}-name-error`} className={errorClass} role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* email */}
                  <div className="sm:col-span-1">
                    <label htmlFor={`${formId}-email`} className={labelClass}>
                      Email {required}
                    </label>
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={fields.email}
                      onChange={(event) => update("email", event.target.value)}
                      onBlur={() => blur("email")}
                      aria-required="true"
                      aria-invalid={Boolean(errors.email && touched.email)}
                      aria-describedby={errors.email && touched.email ? `${formId}-email-error` : undefined}
                      className={fieldClass("email")}
                    />
                    {errors.email && touched.email && (
                      <span id={`${formId}-email-error`} className={errorClass} role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* phone */}
                  <div>
                    <label htmlFor={`${formId}-phone`} className={labelClass}>
                      Phone
                    </label>
                    <input
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Optional"
                      value={fields.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      onBlur={() => blur("phone")}
                      aria-invalid={Boolean(errors.phone && touched.phone)}
                      aria-describedby={errors.phone && touched.phone ? `${formId}-phone-error` : undefined}
                      className={fieldClass("phone")}
                    />
                    {errors.phone && touched.phone && (
                      <span id={`${formId}-phone-error`} className={errorClass} role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* event type */}
                  <div>
                    <label htmlFor={`${formId}-eventType`} className={labelClass}>
                      Event Type {required}
                    </label>
                    <select
                      id={`${formId}-eventType`}
                      name="eventType"
                      value={fields.eventType}
                      onChange={(event) => update("eventType", event.target.value)}
                      onBlur={() => blur("eventType")}
                      aria-required="true"
                      aria-invalid={Boolean(errors.eventType && touched.eventType)}
                      aria-describedby={
                        errors.eventType && touched.eventType ? `${formId}-eventType-error` : undefined
                      }
                      className={fieldClass("eventType")}
                    >
                      <option value="">Please select…</option>
                      {eventTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.eventType && touched.eventType && (
                      <span id={`${formId}-eventType-error`} className={errorClass} role="alert">
                        {errors.eventType}
                      </span>
                    )}
                  </div>

                  {/* date */}
                  <div>
                    <label htmlFor={`${formId}-eventDate`} className={labelClass}>
                      Event Date
                    </label>
                    <input
                      id={`${formId}-eventDate`}
                      name="eventDate"
                      type="date"
                      value={fields.eventDate}
                      onChange={(event) => update("eventDate", event.target.value)}
                      onBlur={() => blur("eventDate")}
                      aria-invalid={Boolean(errors.eventDate && touched.eventDate)}
                      aria-describedby={
                        errors.eventDate && touched.eventDate ? `${formId}-eventDate-error` : undefined
                      }
                      className={fieldClass("eventDate")}
                    />
                    {errors.eventDate && touched.eventDate && (
                      <span id={`${formId}-eventDate-error`} className={errorClass} role="alert">
                        {errors.eventDate}
                      </span>
                    )}
                  </div>

                  {/* location */}
                  <div>
                    <label htmlFor={`${formId}-location`} className={labelClass}>
                      Location
                    </label>
                    <input
                      id={`${formId}-location`}
                      name="location"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="City or venue"
                      value={fields.location}
                      onChange={(event) => update("location", event.target.value)}
                      onBlur={() => blur("location")}
                      className={fieldClass("location")}
                    />
                  </div>

                  {/* guests */}
                  <div>
                    <label htmlFor={`${formId}-guests`} className={labelClass}>
                      Number of Guests
                    </label>
                    <input
                      id={`${formId}-guests`}
                      name="guests"
                      type="number"
                      min={1}
                      inputMode="numeric"
                      placeholder="Optional"
                      value={fields.guests}
                      onChange={(event) => update("guests", event.target.value)}
                      onBlur={() => blur("guests")}
                      aria-invalid={Boolean(errors.guests && touched.guests)}
                      aria-describedby={errors.guests && touched.guests ? `${formId}-guests-error` : undefined}
                      className={fieldClass("guests")}
                    />
                    {errors.guests && touched.guests && (
                      <span id={`${formId}-guests-error`} className={errorClass} role="alert">
                        {errors.guests}
                      </span>
                    )}
                  </div>

                  {/* referral */}
                  <div className="sm:col-span-2">
                    <label htmlFor={`${formId}-referral`} className={labelClass}>
                      How did you hear about Brenda?
                    </label>
                    <input
                      id={`${formId}-referral`}
                      name="referral"
                      type="text"
                      placeholder="Optional"
                      value={fields.referral}
                      onChange={(event) => update("referral", event.target.value)}
                      onBlur={() => blur("referral")}
                      className={fieldClass("referral")}
                    />
                  </div>

                  {/* details */}
                  <div className="sm:col-span-2">
                    <label htmlFor={`${formId}-details`} className={labelClass}>
                      Performance Details {required}
                    </label>
                    <textarea
                      id={`${formId}-details`}
                      name="details"
                      rows={5}
                      placeholder="Tell Brenda about the occasion, the setting, the audience and the kind of performance you have in mind."
                      value={fields.details}
                      onChange={(event) => update("details", event.target.value)}
                      onBlur={() => blur("details")}
                      aria-required="true"
                      aria-invalid={Boolean(errors.details && touched.details)}
                      aria-describedby={
                        errors.details && touched.details ? `${formId}-details-error` : undefined
                      }
                      className={`${fieldClass("details")} resize-y`}
                    />
                    {errors.details && touched.details && (
                      <span id={`${formId}-details-error`} className={errorClass} role="alert">
                        {errors.details}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" size="lg" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <span
                          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-espresso/30 border-t-espresso"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      "Send Performance Inquiry"
                    )}
                  </Button>
                  <p className="font-sans text-[10px] leading-relaxed tracking-[0.08em] text-ivory/35">
                    Fields marked <span className="text-gold">*</span> are required.
                  </p>
                </div>

                <p className="mt-6 font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/30">
                  Front-end prototype — submitting this form does not send a message.
                  Connect a form service to receive inquiries.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
