import { createBrowserRouter } from "react-router-dom";
import Splash from "./components/spalsh/Splash";
import VerifyPhone from "./auth/VerifyPhone";
import Login from "./auth/Login";
import SearchCustomers from "./pages/SearchCustomers";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Settings from "./pages/Setting";
import AddCustomer from "./pages/AddCustomer";
import BookingPage from "./pages/Booking";
import ProfileEdit from "./pages/ProfileEdit";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verifyPhone",
    element: <VerifyPhone />,
  },
  {
    path: "/main",
    element: <Home />,
  },

  {
    path: "/search",
    element: <SearchCustomers />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/add-customer",
    element: <AddCustomer />,
  },
  {
    path: "/add-booking",
    element: <BookingPage />,
  },
  {
    path: "/edit-profile",
    element: <ProfileEdit />,
  },
]);

export default routes;
