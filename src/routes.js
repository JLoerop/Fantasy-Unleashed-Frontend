
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Login from "views/Login";
import Register from "views/Register";
import CreateLeague from "views/CreateLeague";
import LeagueSettings from "views/LeagueSettings";
import LeaguePage from "views/LeaguePage";
import EditLeagueSettings from "views/EditLeagueSettings";
import JoinLeagueLogin from "views/JoinLeagueLogin";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/createleague",
    name: "Create League",
    icon: "nc-icon nc-chart-pie-35",
    component: CreateLeague,
    layout: "/admin"
  },
  {
    path: "/joinleague",
    name: "Join League",
    icon: "nc-icon nc-chart-pie-35",
    component: JoinLeagueLogin,
    layout: "/admin"
  },
  {
    path: "/editleaguesettings",
    name: "Edit League Settings",
    icon: "nc-icon nc-chart-pie-35",
    component: EditLeagueSettings,
    layout: "/admin"
  },
  {
    path: "/leaguepage",
    name: "League Page",
    icon: "nc-icon nc-chart-pie-35",
    component: LeaguePage,
    layout: "/admin"
  },
  {
    path: "/leaguesettings",
    name: "League Settings",
    icon: "nc-icon nc-chart-pie-35",
    component: LeagueSettings,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: Login,
    layout: "/admin"
  },
  {
    path: "/register",
    name: "Register",
    icon: "nc-icon nc-chart-pie-35",
    component: Register,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
