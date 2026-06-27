import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  organization: z.string().trim().min(2, "Organization is required").max(120),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  stage: z.string().min(1, "Pick a stage"),
  message: z.string().trim().min(10, "A short note helps us prepare").max(1000),
});

type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

const STAGES = ["Pre-launch", "Active campaign", "Last 90 days", "Post-election / governance"];

export function ContactSection() {
  const [data, setData] = useState<FormState>({
    name: "", email: "", organization: "", role: "", stage: "", message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
  };

  return (
    <section id="contact" className="relative py-32 md:py-44 border-t border-hairline bg-canvas-warm/40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="eyebrow mb-5">— Request a Demonstration</div>
            <h2 className="display-lg text-navy">Bring Pulse to your campaign.</h2>
            <p className="lede mt-6">
              Tell us where you are in the cycle. We'll tailor a 45-minute walkthrough to your team's most pressing decisions.
            </p>
            <ul className="mt-10 space-y-4 text-[13px]">
              {[
                ["01", "We review your context", "What you've built, where the friction is."],
                ["02", "Private walkthrough", "A live, scoped tour with leadership."],
                ["03", "Pilot scope", "If it fits, we shape a 30-day pilot."],
              ].map(([n, t, b]) => (
                <li key={n} className="flex gap-4">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-civic pt-0.5">{n}</span>
                  <div>
                    <div className="text-navy font-medium">{t}</div>
                    <div className="text-graphite">{b}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-2xl border border-hairline bg-card p-6 md:p-10 shadow-[0_30px_80px_-40px_rgba(20,30,60,0.25)]">
              {done ? (
                <SuccessState onReset={() => { setDone(false); setData({ name:"",email:"",organization:"",role:"",stage:"",message:"" }); }} />
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-graphite">Private demonstration request</div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" id="name" error={errors.name}>
                      <input id="name" value={data.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="Asha Mwangi" autoComplete="name" />
                    </Field>
                    <Field label="Work email" id="email" error={errors.email}>
                      <input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@campaign.org" autoComplete="email" />
                    </Field>
                    <Field label="Organization" id="org" error={errors.organization}>
                      <input id="org" value={data.organization} onChange={(e) => update("organization", e.target.value)} className={inputCls} placeholder="Campaign or party" autoComplete="organization" />
                    </Field>
                    <Field label="Your role" id="role" error={errors.role} optional>
                      <input id="role" value={data.role ?? ""} onChange={(e) => update("role", e.target.value)} className={inputCls} placeholder="Campaign manager" />
                    </Field>
                  </div>

                  <Field label="Where are you in the cycle?" id="stage" error={errors.stage}>
                    <div className="flex flex-wrap gap-2">
                      {STAGES.map((s) => {
                        const active = data.stage === s;
                        return (
                          <button
                            type="button" key={s}
                            onClick={() => update("stage", s)}
                            className={`px-3 py-1.5 rounded-full border text-[12px] transition-colors ${active ? "border-navy bg-navy text-canvas" : "border-hairline bg-card text-graphite hover:border-navy/40"}`}
                          >{s}</button>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="What would you like to see?" id="message" error={errors.message}>
                    <textarea id="message" value={data.message} onChange={(e) => update("message", e.target.value)} rows={5} className={`${inputCls} resize-none`} placeholder="Mission Control, ward operations, manifesto…" maxLength={1000} />
                    <div className="mt-1 text-right text-[10px] font-mono text-graphite">{data.message.length}/1000</div>
                  </Field>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-[11px] text-graphite max-w-sm">By submitting you agree to be contacted by the Pulse team. We don't share your details.</p>
                    <button
                      type="submit" disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-full bg-navy text-canvas px-6 py-3 text-sm font-medium hover:bg-ink transition-colors disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : <>Request demonstration <span aria-hidden>→</span></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-md border border-hairline bg-canvas-warm/30 px-3 py-2.5 text-[14px] text-ink placeholder:text-graphite/60 focus:outline-none focus:border-navy/60 focus:bg-card transition-colors";

function Field({ label, id, error, optional, children }: { label: string; id: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-graphite">{label}</span>
        {optional && <span className="text-[10px] font-mono text-graphite/60">optional</span>}
      </label>
      {children}
      {error && <div className="mt-1 text-[11px] text-destructive">{error}</div>}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-10">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-civic/15 text-civic mb-5">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="font-display text-2xl text-navy">Request received.</div>
      <p className="mt-3 text-graphite max-w-md mx-auto">A member of the Pulse team will reach out within one business day to schedule your private walkthrough.</p>
      <button onClick={onReset} className="mt-6 text-[12px] font-mono uppercase tracking-[0.14em] text-civic hover:text-navy transition-colors">Send another request →</button>
    </div>
  );
}
