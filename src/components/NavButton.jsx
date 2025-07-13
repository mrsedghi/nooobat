import { Link } from "react-router-dom";
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
  Person as PersonIcon,
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
  height: "4rem",
  maxWidth: "28rem",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "1rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "9999px",
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledBottomNavigation>
        <NavigationContainer>
          <Tooltip title="خانه" placement="top" arrow>
            <BottomNavigationAction
              component={Link}
              to="/main"
              icon={<HomeIcon />}
              sx={{
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
              icon={<CalendarIcon />}
              sx={{
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
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </CenterFabContainer>

          <Tooltip title="جست و جو" placement="top" arrow>
            <BottomNavigationAction
              component={Link}
              to="/search"
              icon={<SearchIcon />}
              sx={{
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
              icon={<SettingsIcon />}
              sx={{
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
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: -2,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <MenuItem component={Link} to="/add-customer">
          <ListItemIcon>
            <CustomerIcon fontSize="small" />
          </ListItemIcon>
          افزودن مشتری{" "}
        </MenuItem>
        <MenuItem component={Link} to="/add-booking">
          <ListItemIcon>
            <BookingIcon fontSize="small" />
          </ListItemIcon>
          افزودن نوبت{" "}
        </MenuItem>
      </Menu>
    </>
  );
}

export default NavButton;
