import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Phone,
  Telegram,
  Instagram,
  WhatsApp,
  LocationOn,
  Timer,
  Email,
  Web,
} from "@mui/icons-material";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TempOne = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // Mock data fetch
  useEffect(() => {
    const fetchUserData = () => {
      setTimeout(() => {
        const mockUser = {
          id: "1",
          name: "محمد رضایی",
          title: "طراح گرافیک و عکاس حرفه‌ای",
          phone: "09123456789",
          email: "mohammad@example.com",
          website: "www.mohammadrezaei.ir",
          telegram: "https://t.me/mohammad_rezaei",
          instagram: "https://instagram.com/mohammad.rezaei",
          whatsapp: "https://wa.me/989123456789",
          location: "تهران، خیابان ولیعصر، کوچه فلان",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          portfolio: [
            "https://picsum.photos/800/600?random=1",
            "https://picsum.photos/800/600?random=2",
            "https://picsum.photos/800/600?random=3",
            "https://picsum.photos/800/600?random=4",
            "https://picsum.photos/800/600?random=5",
          ],
          nextAppointment: Date.now() + 86400000, // 1 day from now
          bio: "طراح گرافیک با 10 سال سابقه کار در زمینه طراحی لوگو، برندینگ و عکاسی صنعتی. متخصص در نرم‌افزارهای Adobe Creative Suite و تجربه همکاری با برندهای معتبر داخلی و بین‌المللی.",
        };
        setUser(mockUser);
        setLoading(false);
      }, 500);
    };

    fetchUserData();
  }, []);

  // Countdown renderer
  const renderCountdown = ({ hours, minutes, seconds }) => {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="white">
            {hours.toString().padStart(2, "0")}
          </Typography>
          <Typography variant="caption" color="white">
            ساعت
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight="bold" color="white">
          :
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="white">
            {minutes.toString().padStart(2, "0")}
          </Typography>
          <Typography variant="caption" color="white">
            دقیقه
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight="bold" color="white">
          :
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="white">
            {seconds.toString().padStart(2, "0")}
          </Typography>
          <Typography variant="caption" color="white">
            ثانیه
          </Typography>
        </Box>
      </Box>
    );
  };

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Typography color="white">در حال بارگذاری پروفایل...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        pb: 4,
      }}
    >
      {/* Header with Gradient */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          p: 3,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            transform: "rotate(30deg)",
          },
        }}
      >
        {/* Profile Section */}
        <Box
          sx={{ p: 2, textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              width: 120,
              height: 120,
              margin: "0 auto 16px",
              border: "4px solid rgba(255,255,255,0.3)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          />
          <Typography variant="h5" fontWeight="bold" color="white">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="rgba(255,255,255,0.8)">
            {user.title}
          </Typography>
        </Box>

        {/* Countdown Timer */}
        <Paper
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Timer sx={{ ml: 1 }} />
            زمان باقیمانده تا نوبت بعدی
          </Typography>
          <Countdown date={user.nextAppointment} renderer={renderCountdown} />
        </Paper>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: 2, mt: 3 }}>
        {/* Bio Section */}
        <Paper
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="body1"
            sx={{ lineHeight: 2, textAlign: "justify" }}
          >
            {user.bio}
          </Typography>
        </Paper>

        {/* Contact Info */}
        <Paper
          sx={{
            mb: 3,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              p: 2,
              bgcolor: "primary.main",
              color: "white",
            }}
          >
            اطلاعات تماس
          </Typography>
          <List>
            <ListItem
              button
              onClick={() => openLink(`tel:${user.phone}`)}
              sx={{ "&:hover": { bgcolor: "rgba(102, 126, 234, 0.1)" } }}
            >
              <ListItemIcon>
                <Phone color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="تلفن همراه"
                secondary={user.phone}
                secondaryTypographyProps={{ dir: "ltr", textAlign: "right" }}
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => openLink(user.telegram)}
              sx={{ "&:hover": { bgcolor: "rgba(102, 126, 234, 0.1)" } }}
            >
              <ListItemIcon>
                <Telegram color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="تلگرام"
                secondary={user.telegram.replace("https://", "")}
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => openLink(user.instagram)}
              sx={{ "&:hover": { bgcolor: "rgba(102, 126, 234, 0.1)" } }}
            >
              <ListItemIcon>
                <Instagram color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="اینستاگرام"
                secondary={user.instagram.replace("https://", "")}
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => openLink(user.whatsapp)}
              sx={{ "&:hover": { bgcolor: "rgba(102, 126, 234, 0.1)" } }}
            >
              <ListItemIcon>
                <WhatsApp color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="واتساپ"
                secondary={user.whatsapp.replace("https://", "")}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Portfolio */}
        <Paper
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            گالری نمونه کارها
          </Typography>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              "--swiper-pagination-color": theme.palette.primary.main,
              "--swiper-navigation-color": theme.palette.primary.main,
            }}
          >
            {user.portfolio.map((img, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: 250,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={img}
                    alt={`Portfolio ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "white",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2">
                      نمونه کار {index + 1}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Paper>

        {/* Location */}
        <Paper
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ mb: 2, display: "flex", alignItems: "center" }}
          >
            <LocationOn color="primary" sx={{ ml: 1 }} />
            موقعیت مکانی
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {user.location}
          </Typography>
          <Box
            sx={{
              height: 200,
              width: "100%",
              bgcolor: "grey.100",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.811771585663!2d51.38986431526993!3d35.68919798018992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzIxLjEiTiA1McKwMjMnMjguNiJF!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </Box>
        </Paper>

        {/* Social Media Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          <IconButton
            onClick={() => openLink(user.instagram)}
            sx={{
              bgcolor: "#E1306C",
              color: "white",
              "&:hover": { bgcolor: "#C13584" },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            onClick={() => openLink(user.telegram)}
            sx={{
              bgcolor: "#0088cc",
              color: "white",
              "&:hover": { bgcolor: "#0077b5" },
            }}
          >
            <Telegram />
          </IconButton>
          <IconButton
            onClick={() => openLink(user.whatsapp)}
            sx={{
              bgcolor: "#25D366",
              color: "white",
              "&:hover": { bgcolor: "#128C7E" },
            }}
          >
            <WhatsApp />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TempOne;
