import { ContactSection } from "@/types";
import { siteConfig } from "@/config/site";
import { Mail, MapPin, Phone } from "lucide-react";

export const Contact = ({
  content,
}: {
  content: ContactSection["content"];
}) => {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN: Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {content.subtitle ||
                "Get in touch with us today for a free quote."}
            </p>

            <div className="mt-8 space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-x-4">
                <div className="flex-none rounded-full bg-gray-100 p-3">
                  <Phone className="h-6 w-6 text-(--primary)" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">{siteConfig.business.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-x-4">
                <div className="flex-none rounded-full bg-gray-100 p-3">
                  <Mail className="h-6 w-6 text-(--primary)" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">{siteConfig.business.email}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-x-4">
                <div className="flex-none rounded-full bg-gray-100 p-3">
                  <MapPin className="h-6 w-6 text-(--primary)" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Office
                  </h3>
                  <p className="text-gray-600">{siteConfig.business.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
            <form
              action={content.formEndpoint || "https://formspree.io/f/YOUR_ID"}
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
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-(--primary) sm:text-sm sm:leading-6"
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
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-(--primary) sm:text-sm sm:leading-6"
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
                  className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-(--primary) sm:text-sm sm:leading-6"
                />
              </div>

              <button
                type="submit"
                className="block w-full rounded-md bg-(--primary) px-3.5 py-3 text-center text-sm font-semibold text-black shadow-sm hover:opacity-90 transition focus-visible:outline focus-visible:outline-offset-2"
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
