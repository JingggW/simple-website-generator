import React from "react";
import { FormSection } from "@/lib/schema";

type FormProps = FormSection["props"];

export const RequestForm = ({ title, description, fields, submitLabel }: FormProps) => {
  return (
    <section>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-foreground/[0.02] border border-foreground/5 rounded-[2.5rem] p-8 md:p-16 shadow-sm">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-foreground mb-4">{title}</h2>
            {description && <p className="text-lg text-secondary/70">{description}</p>}
          </div>

          <form className="grid gap-8">
            {fields.map((field, idx) => (
              <div key={idx} className="grid gap-3">
                <label className="text-sm font-bold uppercase tracking-widest text-primary ml-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === "textarea" ? (
                  <textarea
                    required={field.required}
                    rows={4}
                    className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg"
                  />
                ) : field.type === "select" ? (
                  <select
                    required={field.required}
                    className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg appearance-none"
                  >
                    <option value="">Select an option...</option>
                    {field.options?.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors text-lg"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-primary text-background font-black text-xl py-5 rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300 mt-4"
            >
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
