import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, UserView, Notifications, Connections } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile   />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "View Users",
        path: "/user-view",
        element: <UserView />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Connect",
        path: "/connections",
        element: <Connections />,
      },
     
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
       {
        icon: <InformationCircleIcon {...icon} />,
        name: "Sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <ArrowLeftOnRectangleIcon {...icon} />,
        name: "Sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
