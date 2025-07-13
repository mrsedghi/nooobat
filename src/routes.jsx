import { createBrowserRouter } from "react-router-dom";
import Splash from "./components/spalsh/Splash";
import VerifyPhone from "./auth/VerifyPhone";
import Login from "./auth/Login";
import SearchCustomers from "./pages/SearchCustomers";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";

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
]);

export default routes;
