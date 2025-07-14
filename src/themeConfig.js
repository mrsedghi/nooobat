// src/themeConfig.js
import { createTheme } from "@mui/material/styles";

// Common configuration for both themes
const baseTheme = {
  direction: "rtl",
  typography: {
    fontFamily: ["Peyda-Reg", "Tahoma", "sans-serif"].join(","),
    fontSize: 14,
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 600, fontSize: "2rem" },
    h3: { fontWeight: 600, fontSize: "1.75rem" },
    body1: { lineHeight: 1.7 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { width: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(93, 63, 211, 0.5)",
            borderRadius: 4,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 18px",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.15)" },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: { color: "#FFFFFF" },
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        InputLabelProps: { shrink: true },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1.5px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "currentColor",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
};

// Light Theme
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#5D3FD3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D4AF37",
      contrastText: "#1a1a1a",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#4a4a4a",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  components: {
    ...baseTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#5D3FD3",
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#9B59B6",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E0BFB8",
      contrastText: "#121212",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#E0E0E0",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  components: {
    ...baseTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A1A1A",
          color: "#9B59B6",
          borderBottom: "1px solid rgba(224, 191, 184, 0.3)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: "#CAA8D5",
          "&:hover": {
            color: "#9B59B6",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#252525",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
          },
        },
      },
    },
  },
});
