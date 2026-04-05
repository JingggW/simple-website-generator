"use client";

import React, { useState } from "react";
import { Theme } from "@/lib/schema";
import { THEME_PRESETS, PRESET_KEYS } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";
import { Palette, Sun, Moon } from "lucide-react";

interface ThemePickerProps {
  currentTheme: Theme;
  onThemeChange: (newTheme: Theme) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Directly use currentTheme.preset and currentTheme.mode for rendering
  // These values are controlled by the parent component's state
  const selectedPreset = currentTheme.preset;
  const selectedMode = currentTheme.mode;

  const handlePresetChange = (presetKey: keyof typeof THEME_PRESETS) => {
    // Get the full theme object for the selected preset
    const newPresetTheme = THEME_PRESETS[presetKey];
    // Create new theme: take new preset's properties, but explicitly set the preset key and preserve the current mode
    const newTheme: Theme = {
      ...newPresetTheme,
      preset: presetKey as Theme["preset"],
      mode: currentTheme.mode,
    };
    onThemeChange(newTheme);
  };

  const handleModeChange = (mode: "light" | "dark" | "auto") => {
    // Create new theme: take current theme properties, but explicitly set the new mode and preserve the current preset
    const newTheme: Theme = {
      ...currentTheme,
      mode: mode,
      preset: currentTheme.preset,
    };
    onThemeChange(newTheme);
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-9999 p-4 bg-background/80 backdrop-blur-md rounded-lg shadow-xl border border-secondary/10 transition-all duration-300",
        isOpen ? "w-64" : "w-12 h-12 flex items-center justify-center",
      )}
    >
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="text-foreground">
          <Palette className="h-6 w-6" />
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-foreground">Theme Picker</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-foreground"
            >
              <Palette className="h-6 w-6" />
            </button>
          </div>

          {/* Preset Selector */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="preset-select"
              className="text-sm text-foreground/70"
            >
              Preset
            </label>
            <select
              id="preset-select"
              value={selectedPreset}
              onChange={(e) =>
                handlePresetChange(e.target.value as keyof typeof THEME_PRESETS)
              }
              className="w-full p-2 bg-surface border border-secondary/20 rounded-md text-foreground"
            >
              {PRESET_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground/70">Mode</label>
            <div className="flex gap-2">
              <button
                onClick={() => handleModeChange("light")}
                className={cn(
                  "flex-1 p-2 rounded-md text-foreground flex items-center justify-center gap-2",
                  selectedMode === "light"
                    ? "bg-primary text-on-primary"
                    : "bg-surface hover:bg-secondary/10",
                )}
              >
                <Sun className="h-4 w-4" /> Light
              </button>
              <button
                onClick={() => handleModeChange("dark")}
                className={cn(
                  "flex-1 p-2 rounded-md text-foreground flex items-center justify-center gap-2",
                  selectedMode === "dark"
                    ? "bg-primary text-on-primary"
                    : "bg-surface hover:bg-secondary/10",
                )}
              >
                <Moon className="h-4 w-4" /> Dark
              </button>
            </div>
          </div>

          {/* Live Color Preview (Optional) */}
          <div className="flex gap-2 mt-2">
            <div
              className="w-8 h-8 rounded-full border border-secondary/20"
              style={{
                backgroundColor: `rgb(var(--primary))`,
              }}
              title="Primary Color"
            />
            <div
              className="w-8 h-8 rounded-full border border-secondary/20"
              style={{
                backgroundColor: `rgb(var(--secondary))`,
              }}
              title="Secondary Color"
            />
            <div
              className="w-8 h-8 rounded-full border border-secondary/20"
              style={{
                backgroundColor: `rgb(var(--background))`,
              }}
              title="Background Color"
            />
          </div>
        </div>
      )}
    </div>
  );
};
