import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  Avatar,
  Chip,
  Fab,
  Menu,
  MenuItem,
  Divider,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Search,
  FilterList,
  ChevronLeft,
  Add,
  Person,
  Event,
  Sort,
  CalendarMonth,
  ArrowUpward,
  ArrowDownward,
  Close,
  AccessTime,
  MonetizationOn,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import NavButton from "../components/NavButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  maxHeight: "80vh",
  overflowY: "auto",
};

function SearchCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Mock customer data with visit history
  const customers = [
    {
      id: 1,
      name: "محمد رضایی",
      phone: "09123456789",
      status: "VIP",
      avatarColor: "secondary.main",
      visits: [
        {
          date: "۱۴۰۲/۰۵/۱۵",
          service: "کوتاهی مو",
          amount: "۱۵۰,۰۰۰ تومان",
          duration: "۴۵ دقیقه",
        },
        {
          date: "۱۴۰۲/۰۴/۱۰",
          service: "رنگ مو",
          amount: "۲۵۰,۰۰۰ تومان",
          duration: "۲ ساعت",
        },
        {
          date: "۱۴۰۲/۰۳/۰۵",
          service: "هایلایت",
          amount: "۳۰۰,۰۰۰ تومان",
          duration: "۳ ساعت",
        },
      ],
    },
    {
      id: 2,
      name: "فاطمه محمدی",
      phone: "09129876543",
      status: "Regular",
      avatarColor: "primary.main",
      visits: [
        {
          date: "۱۴۰۲/۰۵/۱۰",
          service: "ماسک صورت",
          amount: "۱۸۰,۰۰۰ تومان",
          duration: "۳۰ دقیقه",
        },
        {
          date: "۱۴۰۲/۰۲/۲۰",
          service: "اکستنشن مژه",
          amount: "۳۵۰,۰۰۰ تومان",
          duration: "۱.۵ ساعت",
        },
      ],
    },
    {
      id: 3,
      name: "علی کریمی",
      phone: "09151234567",
      status: "VIP",
      avatarColor: "secondary.main",
      visits: [
        {
          date: "۱۴۰۲/۰۵/۱۸",
          service: "اصلاح صورت",
          amount: "۱۲۰,۰۰۰ تومان",
          duration: "۳۰ دقیقه",
        },
        {
          date: "۱۴۰۲/۰۴/۲۵",
          service: "ماساژ",
          amount: "۲۲۰,۰۰۰ تومان",
          duration: "۱ ساعت",
        },
      ],
    },
  ];

  // Get last visit date for display in list
  const searchResults = customers.map((customer) => ({
    ...customer,
    lastVisit: customer.visits[0].date,
  }));

  // Filter and sort results
  const filteredResults = searchResults
    .filter(
      (customer) =>
        customer.name.includes(searchQuery) ||
        customer.phone.includes(searchQuery)
    )
    .filter((customer) => {
      if (dateFilter === "all") return true;
      if (dateFilter === "lastMonth") {
        return customer.lastVisit >= "۱۴۰۲/۰۴/۰۱";
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.lastVisit) - new Date(a.lastVisit);
      } else if (sortBy === "nameAsc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "nameDesc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
      {/* Search Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,

          boxShadow: 3,
        }}
      >
        <IconButton
          component={Link}
          to="/main"
          sx={{
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          جستجوی مشتریان
        </Typography>
        <IconButton
          sx={{
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
          onClick={handleFilterClick}
        >
          <FilterList fontSize="medium" />
        </IconButton>
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
        sx={{ mt: 1 }}
        PaperProps={{
          sx: {
            width: 200,
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
            p: 1,
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ p: 1, fontWeight: "bold" }}>
          مرتب سازی بر اساس
        </Typography>
        <MenuItem
          onClick={() => {
            setSortBy("recent");
            handleFilterClose();
          }}
          selected={sortBy === "recent"}
        >
          <Event fontSize="small" />
          آخرین مراجعه
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("nameAsc");
            handleFilterClose();
          }}
          selected={sortBy === "nameAsc"}
        >
          <ArrowUpward fontSize="small" />
          نام (صعودی)
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("nameDesc");
            handleFilterClose();
          }}
          selected={sortBy === "nameDesc"}
        >
          <ArrowDownward fontSize="small" />
          نام (نزولی)
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle2" sx={{ p: 1, fontWeight: "bold" }}>
          فیلتر تاریخ
        </Typography>
        <MenuItem
          onClick={() => {
            setDateFilter("all");
            handleFilterClose();
          }}
          selected={dateFilter === "all"}
        >
          همه تاریخ‌ها
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDateFilter("lastMonth");
            handleFilterClose();
          }}
          selected={dateFilter === "lastMonth"}
        >
          <CalendarMonth fontSize="small" />
          ماه گذشته
        </MenuItem>
      </Menu>

      {/* Search Bar */}
      <Box sx={{ p: 2, pt: 3 }}>
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <TextField
            dir="rtl"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="نام یا شماره مشتری..."
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove default border
                  outline: "none",
                },
                "&:hover fieldset": {
                  border: "none", // Remove border on hover
                  outline: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove border when focused
                  boxShadow: "0 0 0 2px rgba(93, 63, 211, 0.2)", // Add custom focus indicator
                  outline: "none",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <Search
                  sx={{
                    color: "text.secondary",
                    ml: 1,
                    fontSize: 26,
                  }}
                />
              ),
              style: {
                borderRadius: "8px", // Add border radius
              },
            }}
          />
        </Paper>
      </Box>

      {/* Active Filters */}
      <Box sx={{ px: 2, display: "flex", gap: 1, overflowX: "auto", py: 1 }}>
        <Chip
          label={
            sortBy === "recent"
              ? "مرتب سازی: تاریخ"
              : sortBy === "nameAsc"
              ? "مرتب سازی: الفبا صعودی"
              : "مرتب سازی: الفبا نزولی"
          }
          size="small"
          sx={{
            bgcolor: "primary.light",
            fontWeight: "bold",
          }}
        />
        <Chip
          label={dateFilter === "all" ? "تاریخ: همه" : "تاریخ: ماه گذشته"}
          size="small"
          sx={{
            bgcolor: "primary.light",
            fontWeight: "bold",
          }}
        />
      </Box>

      {/* Search Results */}
      <Box sx={{ px: 2, mt: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Person sx={{ fontSize: 20, ml: 0.5 }} />
          {filteredResults.length} نتیجه یافت شد
        </Typography>

        <List sx={{ py: 0 }}>
          {filteredResults.map((customer) => (
            <Paper
              key={customer.id}
              sx={{
                mb: 2,
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                p: 1.5,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
                },
              }}
              onClick={() => handleCustomerClick(customer)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Avatar
                  sx={{
                    bgcolor: customer.avatarColor,
                    color: "text.primary",
                    width: 48,
                    height: 48,
                    mr: 2,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {customer.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {customer.name}
                    </Typography>
                    {customer.status === "VIP" && (
                      <Chip
                        label="VIP"
                        size="small"
                        sx={{
                          ml: 1.5,
                          bgcolor: "secondary.main",
                          color: "text.primary",
                          fontSize: "0.65rem",
                          height: 20,
                          fontWeight: "bold",
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {customer.phone}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 0.5,
                    }}
                  >
                    <Event
                      sx={{
                        fontSize: 16,
                        color: "text.secondary",
                        ml: 0.5,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      آخرین مراجعه: {customer.lastVisit}
                    </Typography>
                  </Box>
                </Box>
                <ChevronLeft
                  sx={{
                    color: "text.secondary",
                    opacity: 0.8,
                  }}
                />
              </Box>
            </Paper>
          ))}
        </List>
      </Box>

      {/* Customer Visits Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="customer-visits-modal"
        aria-describedby="customer-visits-history"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              سوابق مراجعات
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Box>

          {selectedCustomer && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: selectedCustomer.avatarColor,
                    color: "text.primary",
                    width: 56,
                    height: 56,
                    mr: 2,
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {selectedCustomer.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {selectedCustomer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCustomer.phone}
                  </Typography>
                  {selectedCustomer.status === "VIP" && (
                    <Chip
                      label="VIP"
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: "secondary.main",
                        color: "text.primary",
                        fontSize: "0.65rem",
                        height: 20,
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </Box>
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                تاریخچه مراجعات ({selectedCustomer.visits.length})
              </Typography>

              <TableContainer
                component={Paper}
                sx={{ borderRadius: 2, boxShadow: "none" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "background.paper" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>تاریخ</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>خدمات</TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>مبلغ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedCustomer.visits.map((visit, index) => (
                      <TableRow key={index}>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>{visit.service}</TableCell>

                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                          >
                            <MonetizationOn
                              fontSize="small"
                              sx={{ opacity: 0.7 }}
                            />
                            <span>{visit.amount}</span>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Modal>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
}

export default SearchCustomers;
