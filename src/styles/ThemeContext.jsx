import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { grayPalette, lightPalette, spacePalette } from "./palette";

const ThemeContext = createContext();

export const useAppTheme = () => useContext(ThemeContext);

const palettes = {
  light: lightPalette,
  gray: grayPalette,
  space: spacePalette,
};

export const AppThemeProvider = ({ children }) => {
  const [themeName, setThemeNameState] = useState(() => {
    const saved = localStorage.getItem("appTheme");
    return palettes[saved] ? saved : "light";
  });

  const setThemeName = (newTheme) => {
    if (palettes[newTheme]) {
      setThemeNameState(newTheme);
      localStorage.setItem("appTheme", newTheme);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
  }, [themeName]);

  const theme = useMemo(() => {
    const activePalette = palettes[themeName] || lightPalette;

    return createTheme({
      palette: {
        ...activePalette,
        status: {
          success: activePalette.success?.main,
          warning: activePalette.warning?.main,
          error: activePalette.error?.main,
          info: activePalette.info?.main,
        },
        customMuted: activePalette.mutedAccent,
      },
      shape: {
        borderRadius: 10,
      },
    });
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
