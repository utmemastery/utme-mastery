// src/constants/theme.js

import { Easing } from 'react-native';

// 🎨 Base Colors
const PALETTE = {
  primary: "#2A4AE4",
  primaryLight: "#6B8BFA",
  primaryDark: "#1A33A2",

  secondary: "#FFD60A",
  secondaryLight: "#FFE970",
  secondaryDark: "#B38B00",

  accent: "#FF5C5C", // Alert/CTA

  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",

  background: "#FFFFFF",
  surface: "#F5F7FA",
  surfaceAlt: "#EBEEF3",
  border: "#E0E6ED",

  textPrimary: "#1A1A1A",
  textSecondary: "#5E6C84",
  textMuted: "#9AA5B1",

  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0, 0, 0, 0.4)",
};

// 🌘 Dark Mode Palette
const DARK_PALETTE = {
  ...PALETTE,
  background: "#121212",
  surface: "#1E1E1E",
  surfaceAlt: "#2A2A2A",
  border: "#333C44",

  textPrimary: "#F4F4F4",
  textSecondary: "#B0B0B0",
  textMuted: "#888888",

  primaryLight: "#6B8BFA",
  primaryDark: "#1A33A2",

  success: "#22C55E",
  warning: "#FBBF24",
  danger: "#F87171",

  overlay: "rgba(255, 255, 255, 0.1)",
};

// 🔤 Typography (Semantic Roles)
const FONTS = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
};

const TYPOGRAPHY = {
  heading1: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  heading2: {
    fontFamily: FONTS.semiBold,
    fontSize: 28,
    lineHeight: 36,
  },
  subheading: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
};

// 📏 Sizing & Layout
const SIZES = {
  // Typography sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 14,
  bodySmall: 12,

  // Spacing units
  padding: 16,
  paddingSmall: 8,
  margin: 16,
  marginSmall: 8,

  // Element sizes
  radius: 12,
  cardRadius: 16,
  inputHeight: 50,
  buttonHeight: 48,
};

// 🧊 Shadows (iOS/Android-compatible)
const SHADOWS = {
  card: {
    shadowColor: PALETTE.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  modal: {
    shadowColor: PALETTE.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  glowPrimary: {
    shadowColor: PALETTE.primaryLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
};

// 🌀 Motion Tokens
const MOTIONS = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 600,
  },
  easing: {
    easeInOut: Easing.inOut(Easing.ease),
    easeOut: Easing.out(Easing.poly(4)),
    spring: {
      tension: 40,
      friction: 8,
    },
  },
};

// 🧩 Combined Themes
const THEMES = {
  light: {
    mode: "light",
    ...PALETTE,
  },
  dark: {
    mode: "dark",
    ...DARK_PALETTE,
  },
};

// 🎯 Exporting Design System
export {
  PALETTE,
  DARK_PALETTE,
  COLORS, // legacy fallback
  FONTS,
  TYPOGRAPHY,
  SIZES,
  SHADOWS,
  MOTIONS,
  THEMES,
};

// Optional legacy alias
const COLORS = PALETTE;
