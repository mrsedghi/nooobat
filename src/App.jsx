// src/App.jsx
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Icons for toggle
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { lightTheme, darkTheme } from "./themeConfig"; // Import themes

// RTL Cache setup
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const [mode, setMode] = useState("dark"); // Default: dark

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {/* Beautiful icon toggle (top-right corner) */}
        <IconButton
          onClick={toggleMode}
          color="inherit"
          sx={{
            position: "fixed",
            top: 16,
            left: 16, // RTL adjustment (right in LTR)
            zIndex: 55,
          }}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
