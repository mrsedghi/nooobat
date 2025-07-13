// src/themeConfig.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Peyda-Reg",
    allVariants: { color: "#2D3748" }, // Dark gray for better readability
  },
  palette: {
    mode: "light",
    primary: {
      main: "#FF6B6B", // Soft coral
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF9E7D", // Peach
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8F9FA", // Very light gray
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2D3748",
      secondary: "#4A5568",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#FF6B6B",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          borderBottom: "1px solid rgba(255, 158, 125, 0.3)", // Subtle peach border
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#E56B6F", // Soft coral
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": {
            color: "#FF9E7D", // Peach on hover
            textDecoration: "underline",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
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
    allVariants: { color: "#E2E8F0" }, // Light gray for better readability
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#FF9E7D", // Peach
      contrastText: "#1A202C",
    },
    secondary: {
      main: "#FEB2B2", // Light salmon
      contrastText: "#1A202C",
    },
    background: {
      default: "#1A202C", // Deep navy
      paper: "#2D3748",
    },
    text: {
      primary: "#E2E8F0",
      secondary: "#CBD5E0",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2D3748",
          color: "#FF9E7D",
          boxShadow: "none",
          borderBottom: "1px solid rgba(254, 178, 178, 0.2)", // Subtle salmon border
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#FEB2B2", // Light salmon
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": {
            color: "#FF9E7D", // Peach on hover
            textDecoration: "underline",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
