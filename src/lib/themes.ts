import type { CSSProperties } from "react";

export type ThemeName =
  | "rose"
  | "emerald"
  | "gold"
  | "sapphire"
  | "lavender"
  | "terracotta"
  | "champagne"
  | "vintage-gold";

export type Theme = {
  paper: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accentSoft: string;
  accentDeep: string;
};

export const themes: Record<ThemeName, Theme> = {
  rose: {
    paper: "#FDF6F3",
    ink: "#3E1A26",
    inkMuted: "#7A5A64",
    accent: "#B0536B",
    accentSoft: "#F5E4E9",
    accentDeep: "#8E4054",
  },
  emerald: {
    paper: "#FBFDF9",
    ink: "#17392B",
    inkMuted: "#5B7166",
    accent: "#2E6B4F",
    accentSoft: "#E4EEE7",
    accentDeep: "#23543D",
  },
  gold: {
    paper: "#FDFBF4",
    ink: "#2B2417",
    inkMuted: "#72675A",
    accent: "#A9802F",
    accentSoft: "#F1E8D4",
    accentDeep: "#8A6622",
  },
  sapphire: {
    paper: "#F8FAFD",
    ink: "#1A2A3E",
    inkMuted: "#5A6B80",
    accent: "#3E6B9E",
    accentSoft: "#E4ECF4",
    accentDeep: "#2F527C",
  },
  lavender: {
    paper: "#FBFAFD",
    ink: "#2E2440",
    inkMuted: "#6F6680",
    accent: "#7A5C9E",
    accentSoft: "#ECE5F3",
    accentDeep: "#5F4780",
  },
  terracotta: {
    paper: "#FDFAF6",
    ink: "#3A2418",
    inkMuted: "#7A6A5E",
    accent: "#B0662E",
    accentSoft: "#F3E6DC",
    accentDeep: "#93511F",
  },
  champagne: {
    paper: "#FBF7EF",
    ink: "#2F2516",
    inkMuted: "#6F6149",
    accent: "#B5905B",
    accentSoft: "#F0E6D2",
    accentDeep: "#96763F",
  },
  "vintage-gold": {
    paper: "#FDFBF7",
    ink: "#201810",
    inkMuted: "#685C50",
    accent: "#B87018",
    accentSoft: "#F3EAD3",
    accentDeep: "#88480C",
  },
};

export function getTheme(name: string): Theme {
  return themes[name as ThemeName] ?? themes.emerald;
}

export function themeVars(name: string): CSSProperties {
  const t = getTheme(name);
  return {
    "--paper": t.paper,
    "--ink": t.ink,
    "--ink-muted": t.inkMuted,
    "--accent": t.accent,
    "--accent-soft": t.accentSoft,
    "--accent-deep": t.accentDeep,
  } as CSSProperties;
}
