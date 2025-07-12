// src/themeConfig.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Peyda-Reg",
    allVariants: { color: "#1a1a1a" },
  },
  palette: {
    mode: "light",
    primary: { main: "#5D3FD3" }, // Deep royal purple
    secondary: { main: "#D4AF37" }, // Metallic gold
    background: { default: "#FFFFFF", paper: "#F5F5F5" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#5D3FD3", // Purple text
          borderBottom: "1px solid #D4AF37", // Gold accent
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#673147", // Plum purple
          "&:hover": {
            color: "#5D3FD3", // Royal purple on hover
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Peyda-Reg",
    allVariants: { color: "#F5F5F5" },
  },
  palette: {
    mode: "dark",
    primary: { main: "#9B59B6" }, // Amethyst purple
    secondary: { main: "#E0BFB8" }, // Rose gold
    background: { default: "#121212", paper: "#1E1E1E" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A1A1A",
          color: "#9B59B6", // Amethyst text
          borderBottom: "1px solid #E0BFB8", // Rose gold accent
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#B57EDC", // Soft lavender
          "&:hover": {
            color: "#9B59B6", // Amethyst on hover
          },
        },
      },
    },
  },
});
