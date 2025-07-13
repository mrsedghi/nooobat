import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Fab,
  Divider,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Add,
  Event,
  AccessTime,
  Person,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import NavButton from "../components/NavButton";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Initialize state properly
  const [bookedVisits, setBookedVisits] = useState([
    {
      id: 1,
      customerName: "محمد رضایی",
      service: "کوتاهی مو",
      date: "1402/05/15",
      time: "10:00 - 11:00",
      status: "تایید شده",
      avatarColor: "secondary.main",
    },
    {
      id: 2,
      customerName: "فاطمه محمدی",
      service: "رنگ مو",
      date: "1402/05/15",
      time: "14:00 - 16:00",
      status: "در انتظار",
      avatarColor: "primary.main",
    },
    {
      id: 3,
      customerName: "علی کریمی",
      service: "هایلایت",
      date: "1402/05/16",
      time: "11:00 - 14:00",
      status: "تایید شده",
      avatarColor: "secondary.main",
    },
  ]);

  // Create new arrays when filtering to avoid mutation
  const todayVisits = bookedVisits.filter(
    (visit) => visit.date === "1402/05/15" // In real app, use current date
  );

  const tomorrowVisits = bookedVisits.filter(
    (visit) => visit.date === "1402/05/16" // In real app, use current date + 1
  );

  // Safe date formatting
  const formatPersianDate = (date) => {
    // In production, use a library like moment-jalaali
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("fa-IR", options).format(date);
  };

  // Safe date navigation
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Days of week in Persian
  const persianDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];

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
      {/* Calendar Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          boxShadow: 3,
        }}
      >
        <IconButton
          onClick={() => changeDate(-1)}
          sx={{ color: "primary.contrastText" }}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {formatPersianDate(currentDate)}
          </Typography>
          <Typography variant="body2">تقویم نوبت‌ها</Typography>
        </Box>

        <IconButton
          onClick={() => changeDate(1)}
          sx={{ color: "primary.contrastText" }}
        >
          <ChevronRight fontSize="medium" />
        </IconButton>
      </Box>

      {/* Week Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {persianDays.map((day, index) => (
          <Box key={day} sx={{ textAlign: "center" }}>
            <Typography variant="body2">{day}</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: index === 3 ? "bold" : "normal",
                color: index === 3 ? "primary.main" : "text.primary",
              }}
            >
              {15 + index - 3} {/* Example dates */}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Today's Visits */}
      <Box sx={{ px: 2, mt: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Event sx={{ mr: 1, color: "primary.main" }} />
          نوبت‌های امروز ({todayVisits.length})
        </Typography>

        {todayVisits.length > 0 ? (
          todayVisits.map((visit) => (
            <Paper
              key={visit.id}
              sx={{
                mb: 2,
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                p: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: visit.avatarColor,
                    color: "text.primary",
                    width: 48,
                    height: 48,
                    mr: 2,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {visit.customerName.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {visit.customerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {visit.service}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTime
                      sx={{ fontSize: 16, color: "text.secondary", ml: 0.5 }}
                    />
                    <Typography variant="body2">{visit.time}</Typography>
                  </Box>
                  <Chip
                    label={visit.status}
                    size="small"
                    sx={{
                      mt: 0.5,
                      bgcolor:
                        visit.status === "تایید شده"
                          ? "success.light"
                          : "warning.light",
                      color:
                        visit.status === "تایید شده"
                          ? "success.dark"
                          : "warning.dark",
                      fontSize: "0.65rem",
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Typography variant="body2" color="text.secondary">
              هیچ نوبتی برای امروز ثبت نشده است
            </Typography>
          </Paper>
        )}
      </Box>

      <Divider sx={{ my: 3, mx: 2 }} />

      {/* Tomorrow's Visits */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Event sx={{ mr: 1, color: "primary.main" }} />
          نوبت‌های فردا ({tomorrowVisits.length})
        </Typography>

        {tomorrowVisits.length > 0 ? (
          tomorrowVisits.map((visit) => (
            <Paper
              key={visit.id}
              sx={{
                mb: 2,
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                p: 2,
                opacity: 0.8,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  opacity: 1,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: visit.avatarColor,
                    color: "text.primary",
                    width: 48,
                    height: 48,
                    mr: 2,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {visit.customerName.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {visit.customerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {visit.service}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTime
                      sx={{ fontSize: 16, color: "text.secondary", ml: 0.5 }}
                    />
                    <Typography variant="body2">{visit.time}</Typography>
                  </Box>
                  <Chip
                    label={visit.status}
                    size="small"
                    sx={{
                      mt: 0.5,
                      bgcolor:
                        visit.status === "تایید شده"
                          ? "success.light"
                          : "warning.light",
                      color:
                        visit.status === "تایید شده"
                          ? "success.dark"
                          : "warning.dark",
                      fontSize: "0.65rem",
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Paper
            sx={{ p: 3, textAlign: "center", borderRadius: 3, opacity: 0.8 }}
          >
            <Typography variant="body2" color="text.secondary">
              هیچ نوبتی برای فردا ثبت نشده است
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 90,
          right: 20,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "scale(1.05)",
          },
          transition: "all 0.2s",
        }}
        component={Link}
        to="/add-booking"
      >
        <Add sx={{ fontSize: 28 }} />
      </Fab>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
};

export default Calendar;
