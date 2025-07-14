import {
  Box,
  Typography,
  Paper,
  Tab,
  Tabs,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import {
  PersonAdd,
  UploadFile,
  Contacts,
  ChevronLeft,
  Check,
  Close,
  Person,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavButton from "../components/NavButton";

const AddCustomer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [manualForm, setManualForm] = useState({ name: "", phone: "" });
  const [excelFile, setExcelFile] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState([
    { id: 1, name: "علی محمدی", phone: "09123456789" },
    { id: 2, name: "فاطمه رضایی", phone: "09129876543" },
    { id: 3, name: "محمد کریمی", phone: "09151112233" },
    { id: 4, name: "زهرا احمدی", phone: "09153334455" },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log("Adding customer:", manualForm);
    // Add your API call here
    setManualForm({ name: "", phone: "" });
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcelFile(file);
      // Here you would parse the Excel file
      console.log("Excel file uploaded:", file.name);
    }
  };

  const handleContactSelect = (contact) => {
    setSelectedContacts((prev) =>
      prev.some((c) => c.id === contact.id)
        ? prev.filter((c) => c.id !== contact.id)
        : [...prev, contact]
    );
  };

  const handleImportContacts = () => {
    console.log("Importing contacts:", selectedContacts);
    // Add your API call here
    setSelectedContacts([]);
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
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          boxShadow: 3,
        }}
      >
        <IconButton
          component={Link}
          to="/customers"
          sx={{ color: "primary.contrastText" }}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          افزودن مشتری جدید
        </Typography>
        <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
      </Box>

      {/* Tabs */}
      <Paper sx={{ mx: 2, mt: 2, borderRadius: 3, overflow: "hidden" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "secondary.main",
              height: 3,
            },
          }}
        >
          <Tab icon={<PersonAdd />} label="دستی" sx={{ minHeight: 64 }} />
          <Tab icon={<UploadFile />} label="اکسل" sx={{ minHeight: 64 }} />
          <Tab icon={<Contacts />} label="مخاطبین" sx={{ minHeight: 64 }} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ p: 2 }}>
        {activeTab === 0 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "background.paper" }}>
            <form onSubmit={handleManualSubmit}>
              <TextField
                fullWidth
                label="نام مشتری"
                name="name"
                value={manualForm.name}
                onChange={handleManualInputChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="شماره تماس"
                name="phone"
                value={manualForm.phone}
                onChange={handleManualInputChange}
                sx={{ mb: 3 }}
                required
                inputProps={{ pattern: "[0-9]{11}" }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: "secondary.main",
                  "&:hover": { bgcolor: "secondary.dark" },
                  height: 48,
                  borderRadius: 3,
                }}
              >
                افزودن مشتری
              </Button>
            </form>
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              textAlign: "center",
            }}
          >
            <input
              accept=".xlsx,.xls,.csv"
              style={{ display: "none" }}
              id="excel-upload"
              type="file"
              onChange={handleExcelUpload}
            />
            <label htmlFor="excel-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadFile />}
                sx={{
                  bgcolor: "secondary.main",
                  "&:hover": { bgcolor: "secondary.dark" },
                  height: 48,
                  borderRadius: 3,
                  mb: 2,
                }}
              >
                انتخاب فایل اکسل
              </Button>
            </label>

            {excelFile ? (
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={excelFile.name}
                  onDelete={() => setExcelFile(null)}
                  deleteIcon={<Close />}
                  sx={{
                    bgcolor: "success.light",
                    color: "success.dark",
                    py: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  فرمت مورد قبول: Excel (فقط نام و شماره تماس)
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, height: 48, borderRadius: 3 }}
                  onClick={() => console.log("Processing Excel file...")}
                >
                  پردازش و افزودن
                </Button>
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                فایل اکسل حاوی لیست مشتریان را انتخاب کنید
              </Typography>
            )}
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper
            sx={{
              borderRadius: 3,
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
          >
            <List sx={{ p: 0 }}>
              {contacts.map((contact) => (
                <ListItem
                  key={contact.id}
                  button
                  onClick={() => handleContactSelect(contact)}
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: selectedContacts.some((c) => c.id === contact.id)
                      ? "primary.light"
                      : "background.paper",
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    <Person />
                  </Avatar>
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.phone}
                    primaryTypographyProps={{ fontWeight: "medium" }}
                  />
                  {selectedContacts.some((c) => c.id === contact.id) && (
                    <Check color="primary" />
                  )}
                </ListItem>
              ))}
            </List>

            {selectedContacts.length > 0 && (
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleImportContacts}
                  sx={{
                    bgcolor: "secondary.main",
                    "&:hover": { bgcolor: "secondary.dark" },
                    height: 48,
                    borderRadius: 3,
                  }}
                >
                  افزودن {selectedContacts.length} مخاطب
                </Button>
              </Box>
            )}
          </Paper>
        )}
      </Box>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
};

export default AddCustomer;
