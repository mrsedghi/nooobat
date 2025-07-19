import { Link, useLocation } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Tooltip,
  styled,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Search as SearchIcon,
  Group as CustomerIcon,
  Book as BookingIcon,
} from "@mui/icons-material";
import { useState } from "react";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: "fixed",
  zIndex: 50,
  width: "100%",
  height: "4.5rem",
  maxWidth: "28rem",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "1rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "9999px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
}));

const NavigationContainer = styled("div")({
  display: "grid",
  height: "100%",
  maxWidth: "28rem",
  gridTemplateColumns: "repeat(5, 1fr)",
  margin: "0 auto",
});

const CenterFabContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NavButton() {
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      <StyledBottomNavigation>
        <NavigationContainer>
          <Tooltip title="خانه" placement="top" arrow>
            <BottomNavigationAction
              component={Link}
              to="/main"
              icon={
                <>
                  <HomeIcon
                    sx={{
                      color: isActive("/main")
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      transition: "color 0.3s ease",
                    }}
                  />
                </>
              }
              sx={{
                position: "relative",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
          </Tooltip>

          <Tooltip title="تقویم" placement="top" arrow>
            <BottomNavigationAction
              component={Link}
              to="/calendar"
              icon={
                <>
                  <CalendarIcon
                    sx={{
                      color: isActive("/calendar")
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      transition: "color 0.3s ease",
                    }}
                  />
                </>
              }
              sx={{
                position: "relative",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
          </Tooltip>

          <CenterFabContainer>
            <Tooltip title="افزودن" placement="top" arrow>
              <Fab
                color="primary"
                size="medium"
                onClick={handleClick}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: `0 6px 16px ${theme.palette.primary.light}`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <AddIcon sx={{ color: "white" }} />
              </Fab>
            </Tooltip>
          </CenterFabContainer>

          <Tooltip title="جست و جو" placement="top" arrow>
            <BottomNavigationAction
              component={Link}
              to="/customers"
              icon={
                <>
                  <SearchIcon
                    sx={{
                      color: isActive("/customers")
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      transition: "color 0.3s ease",
                    }}
                  />
                </>
              }
              sx={{
                position: "relative",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
          </Tooltip>

          <Tooltip title="تنظیمات" placement="top" arrow>
            <BottomNavigationAction
              component={Link}
              to="/settings"
              icon={
                <>
                  <SettingsIcon
                    sx={{
                      color: isActive("/settings")
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      transition: "color 0.3s ease",
                    }}
                  />
                </>
              }
              sx={{
                position: "relative",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
          </Tooltip>
        </NavigationContainer>
      </StyledBottomNavigation>

      {/* Add Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 12px rgba(0,0,0,0.2))",
            mt: -2,
            borderRadius: "12px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: "50%",
              transform: "translateX(50%)",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <MenuItem
          component={Link}
          to="/add-customer"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.primary.light + "20",
            },
          }}
        >
          <ListItemIcon>
            <CustomerIcon
              fontSize="small"
              sx={{ color: theme.palette.primary.main }}
            />
          </ListItemIcon>
          افزودن مشتری
        </MenuItem>
        <MenuItem
          component={Link}
          to="/add-booking"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.primary.light + "20",
            },
          }}
        >
          <ListItemIcon>
            <BookingIcon
              fontSize="small"
              sx={{ color: theme.palette.primary.main }}
            />
          </ListItemIcon>
          افزودن نوبت
        </MenuItem>
      </Menu>
    </>
  );
}

export default NavButton;
