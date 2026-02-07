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
    <section className="py-24 bg-white" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN: Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-lg text-gray-500">{description}</p>
            )}

            <div className="mt-8 space-y-6">
              {/* Phone - Only render if provided by LLM */}
              {phone && (
                <div className="flex items-center gap-x-4">
                  <div className="flex-none rounded-full bg-gray-100 p-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Phone
                    </h3>
                    <p className="text-gray-600">{phone}</p>
                  </div>
                </div>
              )}

              {/* Email - Only render if provided by LLM */}
              {email && (
                <div className="flex items-center gap-x-4">
                  <div className="flex-none rounded-full bg-gray-100 p-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Email
                    </h3>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
              )}

              {/* Address - Only render if provided by LLM */}
              {address && (
                <div className="flex items-center gap-x-4">
                  <div className="flex-none rounded-full bg-gray-100 p-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Office
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Note: 'formEndpoint' is not in your current Schema. 
                You might want to add it to Zod if you want the LLM to control it. 
                For now, we hardcode a placeholder. */}
            <form
              action="https://formspree.io/f/PLACEHOLDER"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>

              <button
                type="submit"
                className="block w-full rounded-md bg-blue-600 px-3.5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90 transition focus-visible:outline focus-visible:outline-offset-2"
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
