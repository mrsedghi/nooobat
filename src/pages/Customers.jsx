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
  Divider,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search,
  FilterList,
  ChevronLeft,
  Person,
  Event,
  ArrowUpward,
  ArrowDownward,
  CalendarMonth,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import NavButton from "../components/NavButton";

function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock customer data with visit history
  const customers = [
    {
      id: 1,
      name: "محمد رضایی",
      phone: "09123456789",
      status: "VIP",
      avatarColor: "secondary.main",
      lastVisit: "۱۴۰۲/۰۵/۱۵",
      totalVisits: 3,
      totalSpent: "۷۰۰,۰۰۰ تومان",
    },
    {
      id: 2,
      name: "فاطمه محمدی",
      phone: "09129876543",
      status: "Regular",
      avatarColor: "primary.main",
      lastVisit: "۱۴۰۲/۰۵/۱۰",
      totalVisits: 2,
      totalSpent: "۵۳۰,۰۰۰ تومان",
    },
    {
      id: 3,
      name: "علی کریمی",
      phone: "09151234567",
      status: "VIP",
      avatarColor: "secondary.main",
      lastVisit: "۱۴۰۲/۰۵/۱۸",
      totalVisits: 2,
      totalSpent: "۳۴۰,۰۰۰ تومان",
    },
  ];

  // Filter and sort results
  const filteredResults = customers
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
          مشتریان
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
            placeholder="جستجوی مشتریان..."
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                  boxShadow: "0 0 0 2px rgba(93, 63, 211, 0.2)",
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
          {filteredResults.length} مشتری یافت شد
        </Typography>

        <List sx={{ py: 0 }}>
          {filteredResults.map((customer) => (
            <ListItem
              key={customer.id}
              component={Link}
              to={`/customer/${customer.id}`}
              sx={{
                mb: 2,
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                p: 1.5,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
                  textDecoration: "none",
                },
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
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
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 1, justifyContent: "space-between" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
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
                      {customer.lastVisit}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {customer.totalVisits} مراجعه
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {customer.totalSpent}
                  </Typography>
                </Stack>
              </Box>
              <ChevronLeft
                sx={{
                  color: "text.secondary",
                  opacity: 0.8,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Navigation */}
      <NavButton />
    </Box>
  );
}

export default Customers;
