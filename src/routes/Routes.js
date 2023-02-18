import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import UserRegister from "../pages/userRegister";
import CompanyRegister from "../pages/companyRegister";
import Test from "../pages/test";
import Jobs from "../pages/jobs";
import Profile from "../pages/profile";
import Homepage from "../pages/homepage";
import Notifications from "../pages/notifications";
import Notfound from "../pages/notfound";
const AppRoutes = [
  {
    path: "/",
    Component: Home,
    isPrivate: false,
  },
  {
    path: "/login",
    Component: Login,
    isPrivate: false,
  },
  {
    path: "/register",
    Component: Register,
    isPrivate: false,
  },
  {
    path: "/register/user",
    Component: UserRegister,
    isPrivate: false,
  },
  {
    path: "/register/company",
    Component: CompanyRegister,
    isPrivate: false,
  },
  {
    path: "/jobs",
    Component: Jobs,
    isPrivate: true,
  },
  {
    path: "/profile/:id",
    Component: Profile,
    isPrivate: true,
  },
  {
    path: "/home",
    Component: Homepage,
    isPrivate: true,
  },
  {
    path: "/notifications",
    Component: Notifications,
    isPrivate: true,
  },
  {
    path: "/test/:id",
    Component: Test,
    isPrivate: true,
  },
  {
    path: "*",
    Component: Notfound,
    isPrivate: false,
  },
];
export default AppRoutes;
