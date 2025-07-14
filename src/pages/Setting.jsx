/* eslint-disable no-unused-vars */
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  IconButton,
  ButtonGroup,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Devices,
  Cached,
  Support,
  Logout,
  ChevronLeft,
  Edit,
  BrightnessAuto,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavButton from "../components/NavButton";

const Settings = () => {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const getStoredMode = () => localStorage.getItem("theme") || "auto";

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success", "error", etc.

  const [mode, setMode] = useState(getStoredMode());
  const [activeSessions] = useState([
    {
      id: 1,
      device: "iPhone 13",
      location: "Tehran, Iran",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      device: "MacBook Pro",
      location: "Tehran, Iran",
      lastActive: "5 minutes ago",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    window.location.reload(); // Reload app to reapply theme
  };

  const handleClearCache = async () => {
    try {
      localStorage.clear();

      if ("indexedDB" in window) {
        const databases = await indexedDB.databases();
        for (const db of databases) {
          if (db.name) indexedDB.deleteDatabase(db.name);
        }
      }

      if ("caches" in window) {
        const names = await caches.keys();
        for (const name of names) {
          await caches.delete(name);
        }
      }

      setSnackbarMessage("حافظه موقت با موفقیت پاک شد");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("خطا در پاکسازی کش", err);
      setSnackbarMessage("خطا در پاکسازی کش");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "0 auto",
        minHeight: "100vh",
        bgcolor: "background.default",
        pb: "80px",
        position: "relative",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          alignItems: "center",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          boxShadow: 3,
        }}
      >
        <IconButton
          component={Link}
          to="/main"
          sx={{ color: "primary.contrastText" }}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          تنظیمات
        </Typography>
        <Box sx={{ width: 40 }} />
      </Box>

      {/* Profile */}
      <Paper
        sx={{
          m: 2,
          p: 2,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "secondary.main",
              fontWeight: "bold",
            }}
          >
            M
          </Avatar>
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              محمد رضایی
            </Typography>
            <Typography variant="body2" color="text.secondary">
              حساب VIP
            </Typography>
            <Chip
              label="آنلاین"
              size="small"
              sx={{
                mt: 0.5,
                bgcolor: "success.light",
                color: "success.dark",
                fontSize: "0.65rem",
              }}
            />
          </Box>
          <IconButton component={Link} to="/edit-profile">
            <Edit />
          </IconButton>
        </Box>
      </Paper>

      {/* Settings */}
      <List sx={{ px: 2 }}>
        {/* Theme Mode */}
        <ListItem
          sx={{
            bgcolor: "background.paper",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            mb: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: 3,
            px: 2,
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <ListItemIcon>
              {mode === "dark" ? (
                <DarkMode color="primary" />
              ) : mode === "light" ? (
                <LightMode color="primary" />
              ) : (
                <BrightnessAuto color="primary" />
              )}
            </ListItemIcon>
            <ListItemText
              primary="حالت نمایش"
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
            }}
          >
            <Button
              onClick={() => handleModeChange("light")}
              variant={mode === "light" ? "contained" : "outlined"}
              startIcon={<LightMode />}
              sx={{
                flex: 1,
                mx: 0.5,
                borderRadius: 2,
                gap: "1rem",
                textTransform: "none",
                fontWeight: mode === "light" ? "bold" : "normal",
              }}
            >
              روشن
            </Button>
            <Button
              onClick={() => handleModeChange("dark")}
              variant={mode === "dark" ? "contained" : "outlined"}
              startIcon={<DarkMode />}
              sx={{
                flex: 1,
                mx: 0.5,
                gap: "1rem",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: mode === "dark" ? "bold" : "normal",
              }}
            >
              تاریک
            </Button>
            <Button
              onClick={() => handleModeChange("auto")}
              variant={mode === "auto" ? "contained" : "outlined"}
              startIcon={<BrightnessAuto />}
              sx={{
                flex: 1,
                mx: 0.5,
                gap: "1rem",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: mode === "auto" ? "bold" : "normal",
              }}
            >
              خودکار
            </Button>
          </Box>
        </ListItem>

        {/* Active Devices */}
        <ListItem
          button
          component={Link}
          to="/active-sessions"
          sx={{
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Devices color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="دستگاه‌های متصل"
            secondary={`${activeSessions.length} دستگاه`}
            primaryTypographyProps={{ fontWeight: "medium" }}
            secondaryTypographyProps={{ color: "text.secondary" }}
          />
        </ListItem>

        {/* Clear Cache */}
        <ListItem
          button
          onClick={handleClearCache}
          sx={{
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            mb: 1,
            cursor: "pointer",
          }}
        >
          <ListItemIcon>
            <Cached color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="پاک کردن حافظه موقت"
            primaryTypographyProps={{ fontWeight: "medium" }}
          />
        </ListItem>

        {/* Support */}
        <ListItem
          button
          component={Link}
          to="/support"
          sx={{
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Support color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="پشتیبانی"
            primaryTypographyProps={{ fontWeight: "medium" }}
          />
        </ListItem>

        <Divider sx={{ my: 2 }} />

        {/* Logout */}
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
            mb: 2,
            px: 2,
            py: 1.5,
            color: "#fff",
            bgcolor: "#d32f2f", // soft red background
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "#b71c1c",
              transform: "translateY(-2px)",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              "& .MuiListItemText-primary": {
                color: "#fff",
              },
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Logout sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText
            primary="خروج از حساب"
            primaryTypographyProps={{
              fontWeight: "bold",
              color: "#fff",
              textAlign: "right",
            }}
          />
        </ListItem>
      </List>

      <NavButton />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 2 }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%", fontWeight: "bold", borderRadius: 2 }}
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
