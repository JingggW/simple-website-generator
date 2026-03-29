import React, { useState } from "react";
import { FormSection } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Calendar, Sparkles } from "lucide-react";

type FormProps = FormSection["props"];

// --- MAIN COMPONENT ---

export const AppointmentForm = ({
  title,
  description,
  submitLabel,
  availableServices = [],
}: FormProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteConfig.crmUrl) {
      alert("Form is in demo mode. No CRM URL found.");
      return;
    }

    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      ps_secret: siteConfig.crmSecret,
      ps_source: window.location.pathname,
      ps_type: "Appointment/Booking",
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
      console.error("Booking Error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 bg-secondary/5 rounded-[2.5rem] border border-foreground/5 px-8">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-foreground">Request Sent</h3>
        <p className="text-secondary/70 text-lg mb-8">
          We've received your appointment request. We will contact you shortly to confirm the time.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-primary pb-1 hover:opacity-70 transition-opacity"
        >
          Book another session
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-secondary/5 border border-foreground/5 rounded-[2.5rem] p-8 md:p-16 shadow-sm">
          
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 uppercase tracking-tighter leading-none">
              {title}
            </h2>
            {description && (
              <p className="text-xl text-secondary/70 leading-relaxed max-w-xl">
                {description}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="grid gap-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-primary ml-1">Your Name *</label>
                <input name="client_name" type="text" required className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-all text-lg" placeholder="Full Name" />
              </div>
              
              {/* Email */}
              <div className="grid gap-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-primary ml-1">Email Address *</label>
                <input name="client_email" type="email" required className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-all text-lg" placeholder="hello@example.com" />
              </div>
            </div>

            {/* Service Selection */}
            {availableServices.length > 0 && (
              <div className="grid gap-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-primary ml-1">Requested Service *</label>
                <select name="requested_service" required className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-all text-lg appearance-none">
                  <option value="">Choose a service...</option>
                  {availableServices.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Date & Time Picker */}
            <div className="grid gap-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-primary ml-1 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Proposed Date & Time *
              </label>
              <input 
                name="proposed_datetime" 
                type="datetime-local" 
                required 
                className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-all text-lg" 
              />
              <p className="text-[11px] text-secondary/50 font-medium italic mt-1 ml-1">
                * This is a tentative request. We will confirm final availability with you.
              </p>
            </div>

            {/* Notes */}
            <div className="grid gap-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-primary ml-1">Additional Notes</label>
              <textarea name="notes" rows={3} className="w-full bg-background border-2 border-secondary/10 rounded-2xl p-4 focus:border-primary outline-none transition-all text-lg" placeholder="Any specific requirements..." />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary text-on-primary font-black uppercase tracking-widest text-sm py-6 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4"
            >
              {status === "loading" ? "Processing..." : submitLabel || "Request Appointment"}
            </button>

            {status === "error" && (
              <p className="text-red-500 text-sm font-bold text-center">❌ Failed to send. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
