import React from "react";
import { BlockSection as BlockSectionType } from "@/lib/schema";
import { BlockRenderer } from "./BlockRenderer";

export const BlockSection = ({ blocks }: BlockSectionType["props"]) => {
  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );
};
