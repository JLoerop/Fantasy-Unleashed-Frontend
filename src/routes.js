
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Login from "views/Login";
import Register from "views/Register";
import CreateLeague from "views/CreateLeague";
import LeagueSettings from "views/LeagueSettings";
import LeaguePage from "views/LeaguePage";
import EditLeagueSettings from "views/EditLeagueSettings";
import JoinLeagueLogin from "views/JoinLeagueLogin";
import CreateTeam from "views/CreateTeam";
import CreateLineups from "views/CreateLineups";
import TeamPage from "views/TeamPage";
import MatchPage from "views/MatchPage";

const dashboardRoutes = [
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
    path: "/createlineups",
    name: "Create Lineups",
    icon: "nc-icon nc-chart-pie-35",
    component: CreateLineups,
    layout: "/admin"
  },
  {
    path: "/createteam",
    name: "Create Team",
    icon: "nc-icon nc-chart-pie-35",
    component: CreateTeam,
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
    path: "/teampage",
    name: "Team Page",
    icon: "nc-icon nc-notes",
    component: TeamPage,
    layout: "/admin"
  },
  {
    path: "/matchpage",
    name: "Match Page",
    icon: "nc-icon nc-notes",
    component: MatchPage,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
];

export default dashboardRoutes;
