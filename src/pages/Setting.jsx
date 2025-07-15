// src/pages/Settings.jsx
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
  Divider,
  IconButton,
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
import { useState } from "react";
import NavButton from "../components/NavButton";
import { useThemeContext } from "../contexts/ThemeContext";

const Settings = () => {
  const { mode, changeMode } = useThemeContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: 3,
        }}
      >
        <IconButton component={Link} to="/main" sx={{ color: "inherit" }}>
          <ChevronLeft fontSize="medium" />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          تنظیمات
        </Typography>
        <Box sx={{ width: 40 }} />
      </Box>

      {/* Profile Section */}
      <Paper
        sx={{
          m: 2,
          p: 2,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "secondary.main" }}>
            M
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
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

      {/* Settings List */}
      <List sx={{ px: 2 }}>
        {/* Theme Mode */}
        <ListItem
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: 3,
            bgcolor: "background.paper",
            mb: 1,
            px: 2,
            py: 2,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
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

          <Box sx={{ display: "flex", gap: 1, mt: 2, width: "100%" }}>
            {["light", "dark", "auto"].map((m) => (
              <Button
                key={m}
                onClick={() => changeMode(m)}
                variant={mode === m ? "contained" : "outlined"}
                startIcon={
                  m === "light" ? (
                    <LightMode />
                  ) : m === "dark" ? (
                    <DarkMode />
                  ) : (
                    <BrightnessAuto />
                  )
                }
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  gap: "0.5rem",
                  textTransform: "none",
                  fontWeight: mode === m ? "bold" : "normal",
                }}
              >
                {m === "light" ? "روشن" : m === "dark" ? "تاریک" : "خودکار"}
              </Button>
            ))}
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
            secondary="2 دستگاه"
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
            bgcolor: "#d32f2f",
            "&:hover": {
              bgcolor: "#b71c1c",
              transform: "translateY(-2px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="خروج از حساب"
            primaryTypographyProps={{ fontWeight: "bold", color: "#fff" }}
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
