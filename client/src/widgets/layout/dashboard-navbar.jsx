import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";

//const dotenv = require('dotenv');

export function DashboardNavbar({username, user}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const [user1, setUserdata1] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [username1, setUsername] = useState("");

  useEffect(() => {
    setUsername(username);
    setUserdata1(user);
    try{
      setProfileImage(user.image);
    }catch{
      
    }
    // Only run the effect if username has not been set
    if (!username) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUserdata1(storedUser);
          setProfileImage(storedUser.image);
          setUsername(storedUser.username);
        }
      } catch (error) {
        console.error("Failed to retrieve user from localStorage:", error);
      }
    }
  }, [username]); // Dependency on username, but the effect runs only when it's empty

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.open(`${import.meta.env.VITE_SERVER_URL}api/auth/logout`, "_self");
    navigate('/auth/sign-up');
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center  items-end ">
        <div className="capitalize self-start">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {username1 ? `Hi, ${username1}` : ""}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Button
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex normal-case"
            onClick={handleLogout}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
            Sign Out
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={handleLogout}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Link to="/dashboard/profile">
            {profileImage ? (
              <Avatar
                src={profileImage}
                alt="User Image"
                size="md"
                variant="rounded"
                className="rounded-full shadow-lg shadow-blue-gray-500/40"
              />
            ) : (
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            )}
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
