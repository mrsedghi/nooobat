import { createBrowserRouter } from "react-router-dom";
import Splash from "./components/spalsh/Splash";
import VerifyPhone from "./auth/VerifyPhone";
import Login from "./auth/Login";

import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Settings from "./pages/Setting";
import AddCustomer from "./pages/AddCustomer";
import BookingPage from "./pages/Booking";
import ProfileEdit from "./pages/ProfileEdit";
import Support from "./pages/Support";
import CustomerProfile from "./pages/CustomerProfile";
import Customers from "./pages/Customers";
import TempOne from "./perv/TempOne";

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
    path: "/customers",
    element: <Customers />,
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
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/customer/:customerId",
    element: <CustomerProfile />,
  },
  {
    path: "/temp1",
    element: <TempOne />,
  },
]);

export default routes;
