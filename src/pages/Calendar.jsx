import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Event,
  AccessTime,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import NavButton from "../components/NavButton";
import moment from "moment-jalaali";

const Calendar = () => {
  // Initialize with current Jalali date
  const [currentDate, setCurrentDate] = useState(moment());

  // Sample data with customer IDs
  const [bookedVisits, setBookedVisits] = useState([
    {
      id: 1,
      customerId: "1",
      customerName: "محمد رضایی",
      service: "کوتاهی مو",
      date: moment().format("jYYYY/jMM/jDD"),
      time: "10:00 - 11:00",
      status: "تایید شده",
      avatarColor: "secondary.main",
    },
    {
      id: 2,
      customerId: "2",
      customerName: "فاطمه محمدی",
      service: "رنگ مو",
      date: moment().format("jYYYY/jMM/jDD"),
      time: "14:00 - 16:00",
      status: "در انتظار",
      avatarColor: "primary.main",
    },
    {
      id: 3,
      customerId: "3",
      customerName: "علی کریمی",
      service: "هایلایت",
      date: moment().add(1, "days").format("jYYYY/jMM/jDD"),
      time: "11:00 - 14:00",
      status: "تایید شده",
      avatarColor: "secondary.main",
    },
  ]);

  // Filter visits for today and tomorrow
  const todayVisits = bookedVisits.filter(
    (visit) => visit.date === moment().format("jYYYY/jMM/jDD")
  );

  const tomorrowVisits = bookedVisits.filter(
    (visit) => visit.date === moment().add(1, "days").format("jYYYY/jMM/jDD")
  );

  // Date navigation functions
  const prevDay = () => {
    setCurrentDate(moment(currentDate).subtract(1, "days"));
  };

  const nextDay = () => {
    setCurrentDate(moment(currentDate).add(1, "days"));
  };

  // Format date in Persian
  const formatPersianDate = (date) => {
    return date.format("jD jMMMM jYYYY");
  };

  // Get day name in Persian
  const getPersianDayName = (date) => {
    const days = [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
    ];
    return days[date.day()];
  };

  // Generate week dates for the week navigation
  const getWeekDates = () => {
    const startOfWeek = moment(currentDate).startOf("week");
    return Array.from({ length: 7 }).map((_, i) =>
      moment(startOfWeek).add(i, "days")
    );
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
      {/* Calendar Header */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
        <Box
          sx={{
            p: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: 3,
          }}
        >
          <IconButton onClick={prevDay} sx={{ color: "#fff" }}>
            <ChevronLeft fontSize="medium" />
          </IconButton>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              {formatPersianDate(currentDate)}
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {getPersianDayName(currentDate)} - تقویم نوبت‌ها
            </Typography>
          </Box>

          <IconButton onClick={nextDay} sx={{ color: "#fff" }}>
            <ChevronRight fontSize="medium" />
          </IconButton>
        </Box>

        {/* Week Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            bgcolor: "background.default",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {getWeekDates().map((date) => (
            <Box key={date.format("jYYYYjMMjDD")} sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: date.isSame(currentDate, "day")
                    ? "bold"
                    : "normal",
                  color: date.isSame(currentDate, "day")
                    ? "primary.main"
                    : "text.primary",
                }}
              >
                {getPersianDayName(date)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: date.isSame(currentDate, "day")
                    ? "bold"
                    : "normal",
                  color: date.isSame(currentDate, "day")
                    ? "primary.main"
                    : "text.primary",
                }}
              >
                {date.format("jD")}
              </Typography>
            </Box>
          ))}
        </Box>
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
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                component={Link}
                to={`/customer/${visit.customerId}`}
                sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
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
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  transform: "translateY(-2px)",
                  opacity: 1,
                },
              }}
            >
              <Box
                component={Link}
                to={`/customer/${visit.customerId}`}
                sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
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

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
};

export default Calendar;
