import React from "react";
import { FormSection } from "@/lib/schema";
import { useFormSubmit } from "@/components/integrations/google-sheets/useFormSubmit";

type FormProps = FormSection["props"];

// --- SUB-COMPONENTS ---

const FormInner = ({
  fields,
  submitLabel,
}: {
  fields: FormProps["fields"];
  submitLabel: string;
}) => {
  const { status, setStatus, handleSubmit } = useFormSubmit();

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-4xl animate-bounce">✨</div>
        <h3 className="text-2xl font-black uppercase tracking-tighter">
          Thank You!
        </h3>
        <p className="text-secondary/70">
          We have received your request and will be in touch shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-primary pt-4 hover:opacity-70 transition-opacity"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>
      {fields.map((field, idx) => {
        // Map common field names to our standard CRM keys for email logic
        let inputName = field.name;
        if (field.type === "email") inputName = "client_email";
        if (field.name.toLowerCase() === "name") inputName = "client_name";

        return (
          <div key={idx} className="grid gap-3">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-primary ml-1">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                name={inputName}
                required={field.required}
                rows={4}
                className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg"
              />
            ) : field.type === "select" ? (
              <select
                name={inputName}
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
                name={inputName}
                type={field.type}
                required={field.required}
                className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg"
              />
            )}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-on-primary font-black uppercase tracking-widest text-sm py-6 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : submitLabel}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm font-bold text-center">
          ❌ Failed to send. Please try again.
        </p>
      )}
    </form>
  );
};

export const RequestForm = ({
  title,
  description,
  fields,
  submitLabel,
}: FormProps) => {
  return (
    <section>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-secondary/5 border border-foreground/5 rounded-[2.5rem] p-8 md:p-16 shadow-sm">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tighter leading-none">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-secondary/70">{description}</p>
            )}
          </div>
          <FormInner fields={fields} submitLabel={submitLabel} />
        </div>
      </div>
    </section>
  );
};
