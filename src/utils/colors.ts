import { useColorScheme } from "react-native";

export const colors = {
  light: {
    background: "#FFFFFF",
    backgroundSecondary: "#FAFAFA",
    surface: "#F6F4F8",
    surfaceSecondary: "#EEEAF2",
    text: "#1C1C1E",
    textSecondary: "#6E6E73",
    textTertiary: "#8E8E93",
    textDisabled: "#C7C7CC",
    border: "#E2E2E7",
    borderLight: "#F0EEF2",
    accent: "#B79AD8",
    accentLight: "#D4C4E8",
    accentText: "#FFFFFF",
    buttonSecondary: "#E8E0F0",
    buttonSecondaryText: "#8B6BAE",
    buttonDisabledBg: "#F0EEF2",
    buttonDisabledBorder: "#E2E2E7",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    background: "#0F0F12",
    backgroundSecondary: "#141418",
    surface: "#1C1C20",
    surfaceSecondary: "#26262A",
    text: "#FFFFFF",
    textSecondary: "#A1A1AA",
    textTertiary: "#71717A",
    textDisabled: "#52525B",
    border: "#2A2A2E",
    borderLight: "#3A3A3E",
    accent: "#B79AD8",
    accentLight: "#9B7BC0",
    accentText: "#0F0F12",
    buttonSecondary: "#3A3046",
    buttonSecondaryText: "#C9B5E0",
    buttonDisabledBg: "#26262A",
    buttonDisabledBorder: "#3A3A3E",
    overlay: "rgba(0, 0, 0, 0.7)",
  },
};

export type ThemeColors = typeof colors.light;

export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === "dark" ? colors.dark : colors.light;
}
