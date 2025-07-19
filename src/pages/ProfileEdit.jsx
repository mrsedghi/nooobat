import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment, // Added for icons in TextFields and Selects
} from "@mui/material";
import {
  ChevronLeft,
  Edit,
  CameraAlt,
  Person,
  Cake,
  Work,
  LocationOn,
  Home,
  Instagram,
  WhatsApp,
  Telegram,
  Notes,
  PhoneIphone, // Added for phone number icon
  EventNote, // Added for date picker icon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavButton from "../components/NavButton";

// Import DatePicker components
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns-jalali"; // To format the date for display

// --- Sample Data for Select Options ---
const provinces = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "چهارمحال و بختیاری",
  "خراسان جنوبی",
  "خراسان رضوی",
  "خراسان شمالی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "یزد",
];

// Simplified cities list, ideally you'd filter this based on selected province
const cities = [
  "تهران",
  "مشهد",
  "اصفهان",
  "شیراز",
  "تبریز",
  "کرج",
  "اهواز",
  "قم",
  "کرمان",
  "ارومیه",
  "رشت",
  "زاهدان",
  "همدان",
  "کرمانشاه",
  "یزد",
  "اردبیل",
  "بندرعباس",
  "اراک",
  "ساری",
  "گرگان",
  "سنندج",
  "قزوین",
  "خرم‌آباد",
  "بوشهر",
  "ایلام",
  "شهرکرد",
  "بیرجند",
  "سمنان",
  "یاسوج",
  "بجنورد",
  "زنجان",
  "دزفول",
  "آبادان",
];

const jobs = [
  "برنامه نویس",
  "طراح گرافیک",
  "مدیر پروژه",
  "کارمند اداری",
  "بازاریاب",
  "فروشنده",
  "مهندس عمران",
  "پزشک",
  "پرستار",
  "دانشجو",
  "معلم",
  "راننده",
  "آرایشگر",
  "آشپز",
  "برقکار",
  "مکانیک",
  "کشاورز",
  "خانه دار",
  "بازنشسته",
  "سایر",
];
// --- End Sample Data ---

const ProfileEdit = () => {
  // Sample existing user data
  const [userData, setUserData] = useState({
    fullName: "محمد رضایی",
    phone: "09123456789", // This will be read-only
    gender: "male",
    birthday: null, // Change to null for DatePicker to manage Date objects
    job: "برنامه نویس", // Set a default value for select
    city: "تهران", // Set a default value for select
    province: "تهران", // Set a default value for select
    address: "خیابان آزادی، کوچه شهید فلانی، پلاک ۱۲",
    instagram: "@mohammadreza",
    whatsapp: "09123456789",
    telegram: "@mohammadreza",
    bio: "علاقه مند به تکنولوژی و توسعه نرم افزارهای موبایل",
    profilePhoto: null, // Assuming no default photo, will show initial
  });

  const [birthdayDate, setBirthdayDate] = useState(
    userData.birthday ? new Date(userData.birthday) : null // Convert to Date object if initial string exists
  );

  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBirthdayChange = (newValue) => {
    setBirthdayDate(newValue);
    // Optionally format for storage if your backend expects a string
    setUserData((prev) => ({
      ...prev,
      birthday: newValue ? format(newValue, "yyyy/MM/dd") : null, // Format to 'YYYY/MM/DD'
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your profile update logic here
    console.log("Updated profile:", {
      ...userData,
      profilePhoto: selectedImage || userData.profilePhoto,
      birthday: birthdayDate ? format(birthdayDate, "yyyy/MM/dd") : null, // Ensure correct format on submit
    });
    // In a real application, you would send this userData to your backend API
    alert("پروفایل شما با موفقیت ذخیره شد!"); // Simple confirmation
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

          boxShadow: 3,
        }}
      >
        <IconButton
          component={Link}
          to="/profile"
          sx={{ color: "primary.contrastText" }}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          ویرایش پروفایل
        </Typography>
        <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
      </Box>

      {/* Main Content */}
      <Box dir="rtl" sx={{ p: 2 }}>
        <Paper
          sx={{ p: 2, borderRadius: 3, mb: 2, bgcolor: "background.paper" }}
        >
          {/* Profile Photo */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={selectedImage || userData.profilePhoto}
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: "2.5rem",
                  bgcolor: "primary.light", // Default background for avatar
                  color: "primary.dark",
                  border: "3px solid",
                  borderColor: "primary.main",
                }}
              >
                {userData.fullName ? userData.fullName.charAt(0) : <Person />}
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                  boxShadow: 2,
                  p: 0.8, // Slightly smaller padding for a compact icon button
                }}
              >
                <CameraAlt sx={{ color: "white", fontSize: "1.2rem" }} />{" "}
                {/* Smaller icon */}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              برای تغییر عکس کلیک کنید
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Personal Info */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              color: "text.primary",
            }}
          >
            <Person sx={{ mr: 1, color: "primary.main" }} />
            اطلاعات شخصی
          </Typography>

          <TextField
            fullWidth
            label="نام کامل"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
            variant="outlined" // Explicitly set variant for consistency
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* Phone Number - Read Only */}
          <TextField
            fullWidth
            label="شماره تلفن"
            name="phone"
            value={userData.phone}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              readOnly: true, // Make it read-only
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphone
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>جنسیت</InputLabel>
            <Select
              label="جنسیت"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <Person
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              }
            >
              <MenuItem value="male">مرد</MenuItem>
              <MenuItem value="female">زن</MenuItem>
            </Select>
          </FormControl>

          {/* DatePicker for Birthday */}
          <DatePicker
            label="تاریخ تولد "
            value={birthdayDate}
            onChange={handleBirthdayChange}
            sx={{ mb: 2, width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake
                        fontSize="small"
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                  // Adjust padding to prevent label/icon overlap for date picker
                  sx: {
                    paddingLeft: "40px !important", // Adjust based on icon size
                  },
                }}
                // Adjust label position when shrunk
                InputLabelProps={{
                  sx: {
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(45px, -9px) scale(0.75) !important",
                    },
                  },
                }}
              />
            )}
          />

          {/* Job Select */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>شغل</InputLabel>
            <Select
              label="شغل"
              name="job"
              value={userData.job}
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <Work
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              }
            >
              {jobs.map((job) => (
                <MenuItem key={job} value={job}>
                  {job}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          {/* Location Info */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              color: "text.primary",
            }}
          >
            <LocationOn sx={{ mr: 1, color: "primary.main" }} />
            اطلاعات محل سکونت
          </Typography>

          {/* Province Select */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>استان</InputLabel>
            <Select
              label="استان"
              name="province"
              value={userData.province}
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <LocationOn
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              }
            >
              {provinces.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* City Select */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>شهر</InputLabel>
            <Select
              label="شهر"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <LocationOn
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              }
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="آدرس دقیق"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            multiline
            rows={3}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Home
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Social Media */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              color: "text.primary",
            }}
          >
            <Instagram sx={{ mr: 1, color: "primary.main" }} />
            شبکه های اجتماعی
          </Typography>

          <TextField
            fullWidth
            label="اینستاگرام"
            name="instagram"
            value={userData.instagram}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Instagram
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="واتساپ"
            name="whatsapp"
            value={userData.whatsapp}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatsApp
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="تلگرام"
            name="telegram"
            value={userData.telegram}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Telegram
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Bio */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              color: "text.primary",
            }}
          >
            <Notes sx={{ mr: 1, color: "primary.main" }} />
            درباره من
          </Typography>

          <TextField
            fullWidth
            label="بیوگرافی"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                >
                  <Notes
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{
              height: 56,
              borderRadius: 3,
              fontSize: "1.1rem",
              fontWeight: "bold",
              bgcolor: "secondary.main",
              "&:hover": { bgcolor: "secondary.dark" },
              mt: 3, // Add more margin-top for separation
            }}
          >
            ذخیره تغییرات
          </Button>
        </Paper>
      </Box>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
};

export default ProfileEdit;
