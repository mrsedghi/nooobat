import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useTheme,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Telegram,
  WhatsApp,
  Phone,
  ExpandMore,
  ContactSupport,
  ArrowBack,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavButton from "../components/NavButton";

const Support = () => {
  const theme = useTheme();

  const contactMethods = [
    {
      icon: <Telegram sx={{ color: "#0088CC", fontSize: 28 }} />,
      name: "پشتیبانی تلگرام",
      value: "پاسخگویی 24 ساعته",
      action: "https://t.me/nobat_support",
      color: "rgba(0, 136, 204, 0.1)",
    },
    {
      icon: <WhatsApp sx={{ color: "#25D366", fontSize: 28 }} />,
      name: "پشتیبانی واتساپ",
      value: "پاسخگویی از 8 صبح تا 8 شب",
      action: "https://wa.me/989123456789",
      color: "rgba(37, 211, 102, 0.1)",
    },
    {
      icon: <Phone sx={{ color: theme.palette.primary.main, fontSize: 28 }} />,
      name: "پشتیبانی تلفنی",
      value: "021-12345678 | 9 صبح تا 5 عصر",
      action: "tel:02112345678",
      color: `${theme.palette.primary.main}30`,
    },
  ];

  const faqs = [
    {
      question: "چگونه می‌توانم نوبت جدید ثبت کنم؟",
      answer:
        "برای ثبت نوبت جدید، روی دکمه '+' در پایین صفحه کلیک کنید و گزینه 'افزودن نوبت' را انتخاب نمایید. سپس اطلاعات مورد نیاز را وارد کنید.",
    },
    {
      question: "آیا می‌توانم نوبت را ویرایش یا حذف کنم؟",
      answer:
        "بله، با مراجعه به صفحه تقویم یا لیست نوبت‌ها، روی نوبت مورد نظر کلیک کنید. گزینه‌های ویرایش و حذف در اختیار شما قرار خواهد گرفت.",
    },
    {
      question: "چرا پیامک‌های من ارسال نمی‌شوند؟",
      answer:
        "ابتدا از موجودی پیامک‌های خود در صفحه اصلی اطمینان حاصل کنید. اگر موجودی دارید اما مشکل persists، لطفاً با پشتیبانی تماس بگیرید.",
    },
    {
      question: "چگونه می‌توانم مشتری جدید اضافه کنم؟",
      answer:
        "از منوی '+' در نوار پایین، گزینه 'افزودن مشتری' را انتخاب کنید و اطلاعات مشتری را وارد نمایید.",
    },
    {
      question: "آیا می‌توانم از برنامه روی چند دستگاه استفاده کنم؟",
      answer:
        "بله، شما می‌توانید با یک حساب کاربری روی چند دستگاه وارد شوید. اما توجه داشته باشید که برخی محدودیت‌ها ممکن است اعمال شود.",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "0 auto",
        minHeight: "100vh",
        bgcolor: "background.default",
        pb: "100px",
      }}
    >
      {/* Beautiful Header */}
      <Box
        sx={{
          p: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <IconButton
            component={Link}
            to="/main"
            sx={{ color: "white", mr: 1 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            پشتیبانی و راهنمایی
          </Typography>
        </Box>
      </Box>

      {/* Contact Methods */}
      <Box sx={{ px: 2, mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center" }}
        >
          <ContactSupport sx={{ mr: 1, color: theme.palette.primary.main }} />
          راه‌های ارتباط با ما
        </Typography>

        <Grid container spacing={2}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} key={index} sx={{ width: "100%" }}>
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    width: "100%",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderLeft: `4px solid ${method.color.replace(
                      "0.1)",
                      "1)"
                    )}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: method.color,
                        width: 48,
                        height: 48,
                        mr: 2,
                      }}
                    >
                      {method.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {method.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.value}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: 2,
                        bgcolor: method.color.replace("0.1)", "1)"),
                        color: method.name.includes("تلگرام")
                          ? "white"
                          : method.name.includes("واتساپ")
                          ? "white"
                          : theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: method.color.replace("0.1)", "0.8)"),
                        },
                      }}
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ارتباط
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ px: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center" }}
        >
          <ContactSupport sx={{ mr: 1, color: theme.palette.primary.main }} />
          سوالات متداول
        </Typography>

        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Accordion
              sx={{
                mb: 2,
                borderRadius: "12px !important",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "background.default",
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Box>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
};

export default Support;
