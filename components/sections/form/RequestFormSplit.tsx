import React, { useState } from "react";
import Image from "next/image";
import { FormSection } from "@/lib/schema";
import { siteConfig } from "@/config/site";

type FormProps = FormSection["props"];

// --- SUB-COMPONENTS ---

const FormInner = ({
  fields,
  submitLabel,
}: {
  fields: FormProps["fields"];
  submitLabel: string;
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteConfig.crmUrl) {
      console.warn("⚠️ CRM URL not configured.");
      alert("Form is in demo mode. No CRM URL found.");
      return;
    }

    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Inject Metadata & Security
    const payload = {
      ...data,
      ps_secret: siteConfig.crmSecret,
      ps_source: window.location.pathname,
      ps_type: "Split/Request"
    };

    try {
      await fetch(siteConfig.crmUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      setStatus("success");
    } catch (error) {
      console.error("CRM Submission Error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-4xl animate-bounce">✨</div>
        <h3 className="text-2xl font-black uppercase tracking-tighter">Thank You!</h3>
        <p className="text-secondary/70 text-lg">We've received your inquiry.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-primary pt-4"
        >
          New Submission
        </button>
      </div>
    );
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>
      {fields.map((field, idx) => (
        <div key={idx} className="grid gap-3">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-primary ml-1">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              rows={4}
              className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg"
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              required={field.required}
              className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg appearance-none"
            >
              <option value="">Select an option...</option>
              {field.options?.map((opt: string, oIdx: number) => (
                <option key={oIdx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-on-primary font-black uppercase tracking-widest text-sm py-6 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : submitLabel}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm font-bold text-center">❌ Failed to send. Please try again.</p>
      )}
    </form>
  );
};

export const RequestFormSplit = ({
  title,
  description,
  fields,
  submitLabel,
  imageName,
}: FormProps) => {
  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="relative aspect-[4/5] lg:aspect-auto rounded-[3rem] overflow-hidden shadow-2xl min-h-[500px]">
            {imageName ? (
              <Image
                src={
                  imageName.startsWith("http")
                    ? imageName
                    : `/${imageName.replace(/^\//, "")}`
                }
                alt={title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            ) : (
              <div className="w-full h-full bg-secondary/5 flex items-center justify-center font-black uppercase tracking-widest text-secondary/20">
                Image Placeholder
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-12">
              <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-tight">
                Start Your <br /> Journey With Us
              </h3>
            </div>
          </div>

          <div className="flex flex-col justify-center py-12">
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 uppercase tracking-tighter leading-none">
                {title}
              </h2>
              {description && (
                <p className="text-xl text-secondary max-w-md leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            <FormInner fields={fields} submitLabel={submitLabel} />
          </div>
        </div>
      </div>
    </section>
  );
};
