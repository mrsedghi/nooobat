// src/App.jsx
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { lightTheme, darkTheme } from "./themeConfig";
import { ThemeProviderContext, useThemeContext } from "./contexts/ThemeContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

// RTL cache for Emotion
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function ThemedApp() {
  const { effectiveMode } = useThemeContext();

  return (
    <CacheProvider value={cacheRtl}>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <ThemeProvider
          theme={effectiveMode === "light" ? lightTheme : darkTheme}
        >
          <CssBaseline />
          <RouterProvider router={routes} />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

function App() {
  return (
    <ThemeProviderContext>
      <ThemedApp />
    </ThemeProviderContext>
  );
}

export default App;
