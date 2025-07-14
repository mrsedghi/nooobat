import { useEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { lightTheme, darkTheme } from "./themeConfig";

// RTL Cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredMode = () => localStorage.getItem("theme") || "auto";

function App() {
  const [mode, setMode] = useState(getStoredMode());

  const getEffectiveMode = () => (mode === "auto" ? getSystemTheme() : mode);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (getStoredMode() === "auto") setMode("auto");
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider
        theme={getEffectiveMode() === "light" ? lightTheme : darkTheme}
      >
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
