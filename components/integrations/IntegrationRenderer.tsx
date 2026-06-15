"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Cal.com booking widget to keep initial load lightweight
const CalComWidget = dynamic(() => import("./calcom/CalComWidget"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-surface border border-secondary/10 rounded-2xl animate-pulse">
      <div className="text-secondary/50 font-medium">Loading booking widget...</div>
    </div>
  ),
});

// Dynamically import RequestForm so we don't load form chunk unless required
const RequestForm = dynamic(
  () => import("@/components/sections/form/RequestForm").then((mod) => mod.RequestForm),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center bg-surface border border-secondary/10 rounded-2xl animate-pulse">
        <div className="text-secondary/50 font-medium">Loading form...</div>
      </div>
    ),
  }
);

interface IntegrationRendererProps {
  variant: "calcom" | "google-sheets-form";
  props: any;
}

export function IntegrationRenderer({ variant, props }: IntegrationRendererProps) {
  if (variant === "calcom") {
    return (
      <CalComWidget
        calLink={props.calLink || ""}
        displayType={props.displayType || "inline"}
        ctaLabel={props.ctaLabel}
        title={props.title}
        description={props.description}
      />
    );
  }

  if (variant === "google-sheets-form") {
    return (
      <RequestForm
        title={props.title || "Get in Touch"}
        description={props.description}
        fields={props.fields || []}
        submitLabel={props.submitLabel || "Submit"}
        {...props}
      />
    );
  }

  return null;
}
