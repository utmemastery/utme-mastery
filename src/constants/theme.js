// src/constants/theme.js

const COLORS = {
  // Base brand colors
  primary: "#2A4AE4", // Deep royal blue - trust, intelligence
  secondary: "#FFD60A", // Energetic yellow - alertness, motivation
  accent: "#FF5C5C", // Red for errors or critical alerts

  // Neutral palette
  background: "#FFFFFF",  // Main screen background
  surface: "#F5F7FA",     // Card backgrounds
  border: "#E0E6ED",      // Subtle borders

  textPrimary: "#1A1A1A",   // Headers and body
  textSecondary: "#5E6C84", // Subheadings
  textMuted: "#9AA5B1",     // Less important text

  success: "#10B981",  // Green - right answers
  warning: "#F59E0B",  // Amber - attention
  danger: "#EF4444",   // Red - wrong answers

  // Utility
  overlay: "rgba(0, 0, 0, 0.4)",
  white: "#FFFFFF",
  black: "#000000",
};

const FONTS = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
};

const SIZES = {
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 14,
  small: 12,

  // Spacing
  padding: 16,
  margin: 16,
  radius: 12,
  cardRadius: 16,
  inputHeight: 50,
  buttonHeight: 48,
};

const SHADOWS = {
  card: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  modal: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
};

const THEMES = {
  light: {
    ...COLORS,
    mode: "light",
    background: COLORS.background,
    text: COLORS.textPrimary,
    surface: COLORS.surface,
  },
  dark: {
    ...COLORS,
    mode: "dark",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#F4F4F4",
  },
};

export { COLORS, FONTS, SIZES, SHADOWS, THEMES };
