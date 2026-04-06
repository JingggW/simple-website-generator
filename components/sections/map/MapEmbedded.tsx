import React from "react";
import { MapSection } from "@/lib/schema";

type MapProps = MapSection["props"];

export const MapEmbedded = ({ title, address, zoom = 14 }: MapProps) => {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_GOOGLE_MAPS_API_KEY&q=${encodedAddress}&zoom=${zoom}`;

  // For PoC without API Key, we use the non-API search URL which works for simple embeds
  const fallbackUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <section>
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-foreground">{title}</h2>
          </div>
        )}

        <div className="relative aspect-21/9 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-secondary/5 bg-secondary/10">
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={fallbackUrl}
            allowFullScreen
          />
        </div>

        <div className="mt-8 flex justify-center">
          <div className="bg-secondary/5 px-8 py-4 rounded-full border border-secondary/10">
            <p className="text-secondary font-medium tracking-tight">
              📍 {address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
