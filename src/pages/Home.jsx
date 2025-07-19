import {
  Box,
  Grid,
  Typography,
  Paper,
  Badge,
  Fab,
  Chip,
  Avatar,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import {
  Sms,
  People,
  CalendarToday,
  // New specific icons for Support & Learning
  SentimentSatisfiedAlt, // For رضایت سنجی (Customer Satisfaction)
  Redo, // For بازگشت مشتری (Customer Return)
  Restore, // For یادآوری ترمیم (Recall Reminder)
  Celebration, // For تبریک تولد (Birthday Wishes)
  HelpOutline, // For راهنمای اپ (App Guide)
  SupportAgent, // For پشتیبانی (Support)
  ChevronLeft,
} from "@mui/icons-material";
import "swiper/css";
import "swiper/css/pagination";
import NavButton from "../components/NavButton";
import { Link } from "react-router-dom";

function Home() {
  const theme = useTheme();

  // Mock data
  const smsBalance = 42;
  const bookings = 128;
  const customers = 89;
  const photos = [
    { id: 1, url: "https://picsum.photos/500/201/" },
    { id: 2, url: "https://picsum.photos/500/202/" },
    { id: 4, url: "https://picsum.photos/500/203/" },
    { id: 3, url: "https://picsum.photos/500/204/" },
    { id: 5, url: "https://picsum.photos/500/205/" },
    { id: 6, url: "https://picsum.photos/500/206/" },
  ];

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "0 auto",
        minHeight: "100vh",
        bgcolor: "background.default",
        pb: "80px",
      }}
    >
      {/* App Header with Profile and Logo */}
      <Box
        sx={{
          p: 2,
          px: 3,
          bgcolor: "primary.main",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",

          top: 0,
          zIndex: 10,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        {/* Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            src="https://randomuser.me/api/portraits/men/1.jpg"
            sx={{
              width: 44,
              height: 44,
              border: "2px solid white",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.4)",
            }}
          />
          <Typography variant="subtitle1" fontWeight="500">
            محمد رضایی
          </Typography>
        </Box>

        {/* Center Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          نوبت
        </Typography>

        {/* SMS Balance Chip */}
        <Chip
          label={`${smsBalance} پیامک`}
          size="small"
          variant="filled"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            fontWeight: "bold",
            px: 1,
            backdropFilter: "blur(4px)",
          }}
        />
      </Box>

      {/* Photo Slider with 12px border radius */}
      <Box sx={{ px: 2, mt: 3, mb: 2 }}>
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.2}
          initialSlide={1}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <Box
                sx={{
                  height: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={photo.url}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  alt="Slider"
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Stats Cards - Enhanced UI */}
      <Box
        spacing={2}
        sx={{
          px: 2,
          widows: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            textAlign: "center",
            height: "100%", // Ensure equal height
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CalendarToday
            sx={{
              fontSize: 28,
              color: "primary.main",
              mb: 1,
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            {bookings}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            رزروهای فعال
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            textAlign: "center",
            height: "100%", // Ensure equal height
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <People
            sx={{
              fontSize: 28,
              color: "primary.main",
              mb: 1,
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            {customers}
          </Typography>
          <Typography variant="body2" color="text.primary">
            مشتریان
          </Typography>
        </Paper>
      </Box>

      {/* Buy SMS Package - Enhanced */}
      <Box dir="rtl" sx={{ mt: 3, px: 2 }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              بسته های پیامک
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ویژه مشتریان VIP
            </Typography>
          </Box>
          <Fab
            color="primary"
            size="small"
            sx={{
              boxShadow: "none",
            }}
          >
            <ChevronLeft sx={{ color: "#fff" }} />
          </Fab>
        </Paper>
      </Box>

      {/* Support & Learning - Enhanced */}
      <Typography
        variant="h6"
        sx={{ px: 2, mb: 2, mt: 3, fontWeight: "bold", color: "text.primary" }}
      >
        پشتیبانی و آموزش
      </Typography>

      {/* Using Box with display: grid for more consistent sizing */}
      <Box
        sx={{
          px: 2,
          mb: 3,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
          gap: 2,
        }}
      >
        {/* رضایت سنجی (Customer Satisfaction) */}
        <Paper
          component={Link}
          to={"/temp1"}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.success.main,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <SentimentSatisfiedAlt sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            رضایت سنجی
          </Typography>
        </Paper>

        {/* بازگشت مشتری (Customer Return) - Coming Soon */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.7,
            cursor: "not-allowed",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.info.main,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Redo sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            بازگشت مشتری
          </Typography>
          <Chip
            label="به زودی"
            size="small"
            color="warning"
            sx={{
              fontWeight: "bold",
              fontSize: "0.7rem",
              height: 20,
              borderRadius: 1,
              px: 0.5,
            }}
          />
        </Paper>

        {/* یادآوری ترمیم (Recall Reminder) - Coming Soon */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.7,
            cursor: "not-allowed",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.secondary.main,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Restore sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            یادآوری ترمیم
          </Typography>
          <Chip
            label="به زودی"
            size="small"
            color="warning"
            sx={{
              fontWeight: "bold",
              fontSize: "0.7rem",
              height: 20,
              borderRadius: 1,
              px: 0.5,
            }}
          />
        </Paper>

        {/* تبریک تولد (Birthday Wishes) - Coming Soon */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.7,
            cursor: "not-allowed",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.warning.main,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Celebration sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            تبریک تولد
          </Typography>
          <Chip
            label="به زودی"
            size="small"
            color="warning"
            sx={{
              fontWeight: "bold",
              fontSize: "0.7rem",
              height: 20,
              borderRadius: 1,
              px: 0.5,
            }}
          />
        </Paper>

        {/* راهنمای اپ (App Guide) */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.primary.main,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <HelpOutline sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            آموزش
          </Typography>
        </Paper>

        {/* پشتیبانی (Support) */}
        <Paper
          component={Link}
          to={"/support"}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "background.paper",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.info.main,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <SupportAgent sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            پشتیبانی
          </Typography>
        </Paper>
      </Box>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
}

export default Home;
