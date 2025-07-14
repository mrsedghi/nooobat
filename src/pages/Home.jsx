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
import { Pagination } from "swiper/modules";
import {
  Sms,
  People,
  CalendarToday,
  School,
  Support,
  ChevronLeft,
} from "@mui/icons-material";
import "swiper/css";
import "swiper/css/pagination";
import NavButton from "../components/NavButton";

function Home() {
  const theme = useTheme();

  // Mock data
  const smsBalance = 42;
  const bookings = 128;
  const customers = 89;
  const photos = [
    { id: 1, url: "https://picsum.photos/300/200" },
    { id: 2, url: "https://picsum.photos/300/300" },
    { id: 3, url: "https://picsum.photos/300/400" },
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
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          position: "relative",
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
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1.2}
          centeredSlides
          pagination={{ clickable: true }}
          initialSlide={1}
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
      <Box sx={{ mt: 3, px: 2 }}>
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
      <Grid container spacing={2} sx={{ mt: 2, px: 2, mb: 3 }}>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "background.paper",
              textAlign: "center",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: "primary.light",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              <School sx={{ color: "#fff", fontSize: 24 }} />
            </Box>
            <Typography variant="subtitle2" fontWeight="medium">
              راهنمای اپ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "background.paper",
              textAlign: "center",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: "primary.light",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              <Support sx={{ color: "#fff", fontSize: 24 }} />
            </Box>
            <Typography variant="subtitle2" fontWeight="medium">
              پشتیبانی
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
}

export default Home;
