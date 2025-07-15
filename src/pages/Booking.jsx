import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Chip,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  InputAdornment,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  toggleButtonClasses,
} from "@mui/material";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  ChevronLeft,
  PersonAdd,
  AccessTime,
  Notes,
  Sms,
  Schedule,
  Check,
  Close,
  Search as SearchIcon,
  EventNote,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavButton from "../components/NavButton";

// Mock customers (expanded for better search testing)
const initialCustomers = [
  { id: 1, name: "محمد رضایی", phone: "09123456789" },
  { id: 2, name: "فاطمه محمدی", phone: "09129876543" },
  { id: 3, name: "علی کریمی", phone: "09151112233" },
  { id: 4, name: "زهرا حسینی", phone: "09101234567" },
  { id: 5, name: "محمود احمدی", phone: "09359876543" },
  { id: 6, name: "نسرین سلطانی", phone: "09902345678" },
];

const BookingPage = () => {
  // State management
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "" });
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);

  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);
  const [internalNotes, setInternalNotes] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [sendBookingSMS, setSendBookingSMS] = useState(true);
  const [sendReminderSMS, setSendReminderSMS] = useState(true);
  const [reminderTime, setReminderTime] = useState(2);
  const [timePeriod, setTimePeriod] = useState("");
  const [notesTab, setNotesTab] = useState(0);

  // Update filtered customers based on search term
  useEffect(() => {
    setFilteredCustomers(
      initialCustomers.filter(
        (customer) =>
          customer.name
            .toLowerCase()
            .includes(customerSearchTerm.toLowerCase()) ||
          customer.phone.includes(customerSearchTerm)
      )
    );
  }, [customerSearchTerm]);

  // Determine time period based on selected time
  const calculateTimePeriod = (time) => {
    if (!time) return "";
    const hour = time.getHours();
    if (hour >= 5 && hour < 12) return "صبح";
    if (hour >= 12 && hour < 17) return "ظهر";
    if (hour >= 17 && hour < 21) return "عصر";
    return "شب";
  };

  // Handle form submissions
  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.phone) {
      const customer = {
        id: initialCustomers.length + 1,
        ...newCustomer,
      };
      initialCustomers.push(customer);
      setSelectedCustomer(customer);
      setShowCustomerForm(false);
      setNewCustomer({ name: "", phone: "" });
      setCustomerSearchTerm("");
    }
  };

  const handleSubmitBooking = () => {
    const bookingData = {
      customer: selectedCustomer,
      date: bookingDate ? bookingDate.toLocaleDateString("fa-IR") : null,
      time: bookingTime
        ? bookingTime.toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : null,
      timePeriod,
      internalNotes,
      customerNotes,
      sendBookingSMS,
      sendReminderSMS,
      reminderTime,
    };

    console.log("Booking submitted:", bookingData);
    // Add your booking submission logic here
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
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
            رزرو جدید
          </Typography>
          <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
        </Box>

        {/* Main Content */}
        <Box sx={{ p: 2 }}>
          {/* Customer Selection */}
          <Paper
            sx={{ p: 2, borderRadius: 3, mb: 2, bgcolor: "background.paper" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              مشتری
              {selectedCustomer && (
                <Chip
                  label="انتخاب شده"
                  size="small"
                  color="success"
                  sx={{ ml: 1, fontSize: "0.7rem" }}
                />
              )}
            </Typography>

            {selectedCustomer ? (
              <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: "primary.light" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 40,
                      height: 40,
                      mr: 2,
                    }}
                  >
                    {selectedCustomer.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {selectedCustomer.name}
                    </Typography>
                    <Typography variant="body2">
                      {selectedCustomer.phone}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => setSelectedCustomer(null)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            ) : (
              <Box sx={{ mt: 1 }}>
                {!showCustomerForm ? (
                  <>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      مشتری را انتخاب کنید یا جدید اضافه کنید
                    </Typography>

                    <TextField
                      fullWidth
                      label="جستجوی مشتری (نام یا شماره)"
                      value={customerSearchTerm}
                      onChange={(e) => setCustomerSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />

                    <List sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}>
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <ListItem
                            key={customer.id}
                            button
                            onClick={() => setSelectedCustomer(customer)}
                            sx={{
                              borderRadius: 2,
                              mb: 0.5,
                              "&:hover": { bgcolor: "action.hover" },
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                width: 36,
                                height: 36,
                                mr: 2,
                              }}
                            >
                              {customer.name.charAt(0)}
                            </Avatar>
                            <ListItemText
                              primary={customer.name}
                              secondary={customer.phone}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textAlign: "center", py: 2 }}
                        >
                          مشتری یافت نشد.
                        </Typography>
                      )}
                    </List>

                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<PersonAdd />}
                      onClick={() => setShowCustomerForm(true)}
                      sx={{ mt: 1, borderRadius: 3, py: 1.5 }}
                    >
                      افزودن مشتری جدید
                    </Button>
                  </>
                ) : (
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      fullWidth
                      label="نام مشتری"
                      value={newCustomer.name}
                      onChange={(e) =>
                        setNewCustomer({ ...newCustomer, name: e.target.value })
                      }
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="شماره تماس"
                      value={newCustomer.phone}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          phone: e.target.value,
                        })
                      }
                      sx={{ mb: 2 }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAddCustomer}
                      sx={{ borderRadius: 3, py: 1.5 }}
                    >
                      افزودن مشتری
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setShowCustomerForm(false)}
                      sx={{ mt: 1, borderRadius: 3, py: 1.5 }}
                    >
                      انصراف
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Paper>

          {/* Date & Time */}
          <Paper
            sx={{ p: 2, borderRadius: 3, mb: 2, bgcolor: "background.paper" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              زمان رزرو
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <DatePicker
                value={bookingDate}
                onChange={(newValue) => setBookingDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    // Add padding to the input area to prevent overlap
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ mr: 1 }}>
                          {" "}
                          {/* Added margin-right to adornment */}
                          <EventNote fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: {
                        // Adjust padding-left for the input element to move text and label
                        paddingLeft: "180px !important", // Increase this value as needed
                        borderRadius: 2,
                        py: 0.5,
                      },
                    }}
                    sx={{
                      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        // Adjust position of the shrunk label
                        transform:
                          "translate(45px, -9px) scale(0.75) !important", // Adjust translate X
                      },
                    }}
                  />
                )}
              />

              <TimePicker
                value={bookingTime}
                onChange={(newValue) => {
                  setBookingTime(newValue);
                  setTimePeriod(calculateTimePeriod(newValue));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    // Add padding to the input area to prevent overlap
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ mr: 1 }}>
                          {" "}
                          {/* Added margin-right to adornment */}
                          <AccessTime fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: {
                        // Adjust padding-left for the input element to move text and label
                        paddingLeft: "40px !important", // Increase this value as needed
                        borderRadius: 2,
                        py: 0.5,
                      },
                    }}
                    sx={{
                      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        // Adjust position of the shrunk label
                        transform:
                          "translate(45px, -9px) scale(0.75) !important", // Adjust translate X
                      },
                    }}
                    ampm={false}
                    views={["hours", "minutes"]}
                    openTo="hours"
                  />
                )}
              />
            </Box>

            {bookingTime && (
              <Chip
                label={`بازه زمانی: ${timePeriod}`}
                sx={{
                  mt: 2,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                }}
              />
            )}
          </Paper>

          {/* Notes */}
          <Paper
            sx={{ p: 2, borderRadius: 3, mb: 2, bgcolor: "background.paper" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              توضیحات
            </Typography>

            <Tabs
              value={notesTab}
              onChange={(e, newValue) => setNotesTab(newValue)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              sx={{
                mb: 2,
                "& .MuiTab-root": { borderRadius: 2, mx: 0.5 },
              }}
            >
              <Tab label="یادداشت برای مشتری" />
              <Tab label="یادداشت داخلی" />
            </Tabs>

            {notesTab === 0 && (
              <TextField
                fullWidth
                label="یادداشت برای مشتری"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                multiline
                rows={3}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Notes fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            )}

            {notesTab === 1 && (
              <TextField
                fullWidth
                label="یادداشت داخلی"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                multiline
                rows={3}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Notes fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            )}
          </Paper>

          {/* SMS Settings */}
          <Paper
            sx={{ p: 2, borderRadius: 3, mb: 2, bgcolor: "background.paper" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              تنظیمات پیامک
            </Typography>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={sendBookingSMS}
                    onChange={(e) => setSendBookingSMS(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    ارسال پیامک تایید رزرو
                  </Typography>
                }
                sx={{
                  mb: 1,
                  "& .MuiFormControlLabel-label": { fontSize: "0.95rem" },
                }}
              />

              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={sendReminderSMS}
                    onChange={(e) => setSendReminderSMS(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    ارسال پیامک یادآوری
                  </Typography>
                }
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.95rem" } }}
              />

              {sendReminderSMS && (
                <Box sx={{ mt: 2, pl: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    زمان یادآوری (ساعت قبل):
                  </Typography>
                  <ToggleButtonGroup
                    value={reminderTime}
                    exclusive
                    onChange={(e, newTime) => {
                      if (newTime !== null) {
                        setReminderTime(newTime);
                      }
                    }}
                    aria-label="reminder time"
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    {[1, 2, 4, 8, 12, 24].map((time) => (
                      <ToggleButton
                        key={time}
                        value={time}
                        aria-label={`${time} hours before`}
                        sx={{
                          borderRadius: "0",
                          minWidth: 48,
                          height: 48,
                          fontWeight: "bold",
                          fontSize: "1rem",
                          bgcolor: "action.hover",
                          "&.Mui-selected": {
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                              bgcolor: "primary.dark",
                            },
                          },
                          "&:hover": {
                            bgcolor: "action.selected",
                          },
                        }}
                      >
                        {time}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              )}
            </FormGroup>
          </Paper>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmitBooking}
            disabled={!selectedCustomer || !bookingDate || !bookingTime}
            sx={{
              height: 56,
              borderRadius: 3,
              fontSize: "1.1rem",
              fontWeight: "bold",
              bgcolor: "secondary.main",
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            ثبت رزرو
          </Button>
        </Box>

        {/* Bottom Navigation */}
        <NavButton />
      </Box>
    </LocalizationProvider>
  );
};

export default BookingPage;
