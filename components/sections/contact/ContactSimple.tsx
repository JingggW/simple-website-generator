import { ContactSection } from "@/lib/schema";
import { Mail, MapPin, Phone } from "lucide-react";

// Use the type directly from your Zod inference
type ContactProps = ContactSection["props"];

export const ContactSimple = ({
  title,
  description,
  email,
  phone,
  address,
}: ContactProps) => {
  return (
    <section className="py-24 bg-background text-foreground" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN: Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-lg text-secondary">{description}</p>
            )}

            <div className="mt-8 space-y-6">
              {/* Phone */}
              {phone && (
                <div className="flex items-center gap-x-4">
                  <div className="flex-none rounded-full bg-secondary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Phone
                    </h3>
                    <p className="text-secondary">{phone}</p>
                  </div>
                </div>
              )}

              {/* Email */}
              {email && (
                <div className="flex items-center gap-x-4">
                  <div className="flex-none rounded-full bg-secondary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Email
                    </h3>
                    <p className="text-secondary">{email}</p>
                  </div>
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="flex items-center gap-x-4">
                  <div className="flex-none rounded-full bg-secondary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Office
                    </h3>
                    <p className="text-secondary whitespace-pre-line">
                      {address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="bg-secondary/5 rounded-2xl p-8 shadow-sm border border-secondary/10">
            <form
              action="https://formspree.io/f/PLACEHOLDER"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 bg-background text-foreground shadow-sm ring-1 ring-inset ring-secondary/20 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-secondary/50"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 bg-background text-foreground shadow-sm ring-1 ring-inset ring-secondary/20 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-secondary/50"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-foreground"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 bg-background text-foreground shadow-sm ring-1 ring-inset ring-secondary/20 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-secondary/50"
                />
              </div>

              <button
                type="submit"
                className="block w-full rounded-md bg-primary px-3.5 py-3 text-center text-sm font-semibold text-background shadow-sm hover:opacity-90 transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
