import { DefaultTheme } from 'react-native-paper';

// Modern, accessible color palette
const colors = {
  primary: '#0057FF',        // Deep blue
  accent: '#FFB300',         // Vibrant gold
  background: '#F7F9FC',     // Soft off-white
  surface: '#FFFFFF',        // Pure white
  error: '#D32F2F',          // Strong red
  success: '#388E3C',        // Deep green
  warning: '#FFA000',        // Amber
  info: '#0288D1',           // Blue
  text: '#1A1A1A',           // Near-black
  disabled: '#BDBDBD',       // Muted gray
  placeholder: '#757575',    // Medium gray
  border: '#E0E0E0',         // Light gray
};

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // Add more design tokens as needed
};

export default theme; 