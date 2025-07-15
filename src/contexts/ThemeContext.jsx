/* eslint-disable react-refresh/only-export-components */
// src/contexts/ThemeContext.jsx
import { createContext, useState, useEffect, useMemo, useContext } from "react";

const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredMode = () => localStorage.getItem("theme") || "auto";

export const ThemeProviderContext = ({ children }) => {
  const [mode, setMode] = useState(getStoredMode());

  const effectiveMode = mode === "auto" ? getSystemTheme() : mode;

  const changeMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (getStoredMode() === "auto") setMode("auto");
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const contextValue = useMemo(
    () => ({
      mode,
      effectiveMode,
      changeMode,
    }),
    [mode, effectiveMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
