import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Button,
  TextField, // Added TextField for editable inputs
} from "@mui/material";
import {
  ArrowBack,
  Phone,
  Cake,
  CalendarToday,
  CheckCircle,
  Cancel,
  AccessTime,
  Notes,
  Edit,
  Person,
  Save, // Added Save icon
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavButton from "../components/NavButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Import DatePicker
import dayjs from "dayjs"; // Import dayjs

const CustomerProfile = () => {
  const theme = useTheme();
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode

  // State for editable fields
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedBirthday, setEditedBirthday] = useState(null); // Use dayjs object or null
  const [editedNotes, setEditedNotes] = useState("");

  // Mock data fetch function
  const fetchCustomerData = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCustomers = {
          1: {
            id: "1",
            name: "محمد رضایی",
            phone: "09123456789",
            birthday: "1375/03/15", // Example with birthday
            notes: "مشتری ویژه - علاقه مند به خدمات ویژه",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            registrationDate: "1402/05/15",
            status: "VIP",
            bookings: [
              {
                id: 1,
                date: "1402/06/10",
                time: "10:30",
                service: "کوتاهی مو",
                staff: "نازنین محمدی",
                status: "completed",
                price: "120,000 تومان",
                notes: "اولین مراجعه",
              },
              {
                id: 2,
                date: "1402/06/15",
                time: "14:00",
                service: "رنگ مو",
                staff: "نازنین محمدی",
                status: "completed",
                price: "250,000 تومان",
                notes: "رنگ شماره 6",
              },
              {
                id: 3,
                date: "1402/06/20",
                time: "11:30",
                service: "کوتاهی مو",
                staff: "نازنین محمدی",
                status: "canceled",
                price: "120,000 تومان",
                notes: "لغو توسط مشتری",
              },
            ],
          },
          2: {
            id: "2",
            name: "فاطمه محمدی",
            phone: "09129876543",
            birthday: null, // Example with null birthday
            notes: "مشتری جدید",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            registrationDate: "1402/05/20",
            status: "Regular",
            bookings: [
              {
                id: 4,
                date: "1402/06/25",
                time: "16:00",
                service: "ماسک مو",
                staff: "نازنین محمدی",
                status: "upcoming",
                price: "80,000 تومان",
                notes: "تایید نشده",
              },
            ],
          },
        };
        resolve(mockCustomers[id] || null);
      }, 500);
    });
  };

  useEffect(() => {
    if (customerId) {
      setLoading(true);
      fetchCustomerData(customerId)
        .then((data) => {
          if (data) {
            setCustomer(data);
            // Initialize editable fields with fetched data
            setEditedName(data.name);
            setEditedPhone(data.phone);
            setEditedBirthday(
              data.birthday ? dayjs(data.birthday, "YYYY/MM/DD") : null
            ); // Parse with dayjs
            setEditedNotes(data.notes);
          } else {
            navigate("/customers", { replace: true });
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
          navigate("/customers", { replace: true });
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/customers", { replace: true });
    }
  }, [customerId, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    // In a real application, you would send this data to your backend
    console.log("Saving customer data:", {
      name: editedName,
      phone: editedPhone,
      birthday: editedBirthday ? editedBirthday.format("YYYY/MM/DD") : null, // Format for saving
      notes: editedNotes,
    });

    // Update the local customer state with edited values
    setCustomer((prev) => ({
      ...prev,
      name: editedName,
      phone: editedPhone,
      birthday: editedBirthday ? editedBirthday.format("YYYY/MM/DD") : null,
      notes: editedNotes,
    }));
    setIsEditing(false); // Exit edit mode
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle color="success" sx={{ fontSize: 20 }} />;
      case "upcoming":
        return <AccessTime color="warning" sx={{ fontSize: 20 }} />;
      case "canceled":
        return <Cancel color="error" sx={{ fontSize: 20 }} />;
      default:
        return <CalendarToday sx={{ fontSize: 20 }} />;
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "completed":
        return (
          <Chip
            label="تکمیل شده"
            size="small"
            sx={{
              bgcolor: theme.palette.success.light,
              color: theme.palette.success.dark,
              fontWeight: "bold",
            }}
          />
        );
      case "upcoming":
        return (
          <Chip
            label="آینده"
            size="small"
            sx={{
              bgcolor: theme.palette.warning.light,
              color: theme.palette.warning.dark,
              fontWeight: "bold",
            }}
          />
        );
      case "canceled":
        return (
          <Chip
            label="لغو شده"
            size="small"
            sx={{
              bgcolor: theme.palette.error.light,
              color: theme.palette.error.dark,
              fontWeight: "bold",
            }}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          maxWidth: 450,
          margin: "0 auto",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Typography>در حال بارگذاری...</Typography>
      </Box>
    );
  }

  if (!customer) {
    return null;
  }

  const filteredBookings = customer.bookings.filter((booking) => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return booking.status === "completed";
    if (tabValue === 2) return booking.status === "upcoming";
    if (tabValue === 3) return booking.status === "canceled";
    return true;
  });

  return (
    <Box
      dir="rtl"
      sx={{
        maxWidth: 450,
        margin: "0 auto",
        minHeight: "100vh",
        bgcolor: "background.default",
        pb: "100px",
      }}
    >
      {/* Header with Gradient Background */}
      <Box
        dir="ltr"
        sx={{
          p: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
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
          <IconButton component={Link} to="/customers" sx={{ color: "white" }}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            پروفایل مشتری
          </Typography>
          {/* Edit/Save Button for Header */}
          <Button
            startIcon={isEditing ? <Save /> : <Edit />}
            onClick={isEditing ? handleSave : handleEditToggle}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: "white",
              },
            }}
            variant="outlined"
            size="small"
          >
            {isEditing ? "ذخیره" : "ویرایش"}
          </Button>
        </Box>
      </Box>

      {/* Customer Profile Section */}
      <Box sx={{ px: 2, mt: 4, position: "relative", zIndex: 1 }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <Avatar
            src={customer.avatar}
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto 16px",
              border: `3px solid ${theme.palette.primary.main}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              label="نام مشتری"
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {customer.name}
            </Typography>
          )}

          {customer.status === "VIP" && (
            <Chip
              label="مشتری ویژه"
              color="secondary"
              size="small"
              sx={{
                mb: 2,
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          )}

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                تاریخ عضویت
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {customer.registrationDate}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                تعداد مراجعات
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {customer.bookings.length}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Customer Info Section */}
      <Box sx={{ px: 2, mt: 3 }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            اطلاعات تماس
          </Typography>

          <List sx={{ py: 0 }}>
            <ListItem sx={{ px: 0, py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Phone color="primary" />
              </ListItemIcon>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  label="شماره تماس"
                  type="tel"
                />
              ) : (
                <ListItemText
                  primary="شماره تماس"
                  secondary={customer.phone}
                  secondaryTypographyProps={{
                    sx: {
                      fontWeight: "medium",
                      color: "text.primary",
                    },
                  }}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem sx={{ px: 0, py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Cake color="primary" />
              </ListItemIcon>
              {isEditing ? (
                <DatePicker
                  sx={{ width: "100%" }}
                  label="تاریخ تولد"
                  value={editedBirthday}
                  onChange={(newValue) => setEditedBirthday(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                  format="YYYY/MM/DD" // Ensure correct format is displayed and saved
                />
              ) : (
                <ListItemText
                  primary="تاریخ تولد"
                  secondary={customer.birthday || "تنظیم نشده"}
                  secondaryTypographyProps={{
                    sx: {
                      fontWeight: "medium",
                      color: "text.primary",
                      fontStyle: !customer.birthday ? "italic" : "normal",
                    },
                  }}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem sx={{ px: 0, py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Notes color="primary" />
              </ListItemIcon>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  label="یادداشت"
                  multiline
                  rows={3}
                />
              ) : (
                <ListItemText
                  primary="یادداشت"
                  secondary={customer.notes || "هیچ یادداشتی وجود ندارد"}
                  secondaryTypographyProps={{
                    sx: {
                      fontWeight: "medium",
                      color: "text.primary",
                      fontStyle: !customer.notes ? "italic" : "normal",
                    },
                  }}
                />
              )}
            </ListItem>
          </List>
        </Paper>
      </Box>

      {/* Booking History Section */}
      <Box sx={{ px: 2, mt: 3 }}>
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              bgcolor: "background.paper",
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.primary.main,
                height: 3,
              },
            }}
          >
            <Tab
              label="همه"
              sx={{
                fontWeight: tabValue === 0 ? "bold" : "normal",
                fontSize: "0.875rem",
              }}
            />
            <Tab
              label="تکمیل شده"
              sx={{
                fontWeight: tabValue === 1 ? "bold" : "normal",
                fontSize: "0.875rem",
              }}
            />
            <Tab
              label="آینده"
              sx={{
                fontWeight: tabValue === 2 ? "bold" : "normal",
                fontSize: "0.875rem",
              }}
            />
            <Tab
              label="لغو شده"
              sx={{
                fontWeight: tabValue === 3 ? "bold" : "normal",
                fontSize: "0.875rem",
              }}
            />
          </Tabs>

          <List sx={{ p: 0 }}>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <Box key={booking.id}>
                  <ListItem
                    sx={{
                      px: 2,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {getStatusIcon(booking.status)}
                    </ListItemIcon>
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          {booking.service}
                        </Typography>
                        {getStatusChip(booking.status)}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 0.5,
                          gap: 1,
                        }}
                      >
                        <CalendarToday
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {booking.date} - {booking.time}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 0.5,
                          gap: 1,
                        }}
                      >
                        <Person
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {booking.staff}
                        </Typography>
                      </Box>
                      {booking.notes && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                            gap: 1,
                          }}
                        >
                          <Notes
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {booking.notes}
                          </Typography>
                        </Box>
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontWeight: "bold",
                          color: "primary.main",
                        }}
                      >
                        {booking.price}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </Box>
              ))
            ) : (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  هیچ رزروی یافت نشد
                </Typography>
              </Box>
            )}
          </List>
        </Paper>
      </Box>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
};

export default CustomerProfile;
