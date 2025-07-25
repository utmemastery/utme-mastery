// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEMES, COLORS, FONTS, SIZES, SHADOWS, TYPOGRAPHY } from '../constants/theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('APP_THEME');
      if (storedTheme) {
        setThemeMode(storedTheme);
      } else {
        const colorScheme = Appearance.getColorScheme();
        setThemeMode(colorScheme === 'dark' ? 'dark' : 'light');
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    await AsyncStorage.setItem('APP_THEME', newTheme);
  };

  const currentTheme = THEMES[themeMode];

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeMode,
        toggleTheme,
        COLORS: currentTheme,
        FONTS,
        SIZES,
        SHADOWS,
        TYPOGRAPHY,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
