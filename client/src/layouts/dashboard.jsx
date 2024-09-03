import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {useState, useEffect, Children} from 'react';
import React from 'react';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
//const dotenv = require('dotenv');
import { Home, Profile, Tables, UserView, Notifications } from "@/pages/dashboard";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  
  const [user, setUserdata] = useState({});
  const [show1, setShow] = useState(false);
  const [username, setUsername] = useState("");
  //const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUser = async () => {
   // alert(import.meta.env.VITE_SERVER_URL);
    try {
      // First attempt to fetch the user data using fetch
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/auth/login/success`, {
        method: 'GET',
        credentials: 'include',
      });

      
      if (response.status === 200) {
      //  alert('200-1');
                const data = await response.json();

                if (data.message) {
                  // Handle message if necessary
                }
          
                /*setUserdata(data.user);
                setShow(true);
                setUsername(data.user.username);*/
          
                const updatedUser = {
                  ...data.user, // Existing user data with elements 'A' and 'B'
                  token: data.token, // Add the token element
                };
                setUserdata(updatedUser);
                setShow(true);
                setUsername(data.user.username);
                // Store the updated user object in localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));
               // alert('200-2');
      }else if(response.status === 400){
       // alert('400-1');
                        // If the first attempt fails, try fetching the profile using the JWT token
                //console.error("First method failed, attempting second method:", error);
                try {
                  const storedUser = JSON.parse(localStorage.getItem('user'));
                  //alert(storedUser.token);
                  if (storedUser && storedUser.token) {
                    const config = {
                      headers: {
                        Authorization: `Bearer ${storedUser.token}`,
                      },
                    };

                    const profileResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}api/auth/profile`, {
                      method: 'GET',
                      headers: config.headers,
                    });

                    const profileData = await profileResponse.json();
                    

                    const updatedUser = {
                      ...profileData, // Existing user data with elements 'A' and 'B'
                      token: storedUser.token, // Preserve the token from localStorage
                    };
                    setUserdata(updatedUser);
                    setShow(true);
                    // Store the updated user object in localStorage
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                  } else {
                  //  alert('400-1.2');
                    throw new Error("No token found in localStorage");
                  }
                } catch (secondError) {
                 // alert('400-1.7');
                  console.error("Error fetching profile with token:", secondError);
                  navigate('/auth/sign-in');
                }
               // alert('400-2');
      }else{//if status code is not 200 and not 400 then the user is not logged in
        console.error("Error fetching profile with token:", secondError);
        navigate('/auth/sign-in');
      }
      
      

      
    } catch (error) {
      navigate('/auth/sign-in');
     // alert('400-3');
      console.error("Error fetching profile with token:", secondError);
      
    }
    
   // alert(localStorage.getItem('user'));
  };

  useEffect(() => {
    getUser();
  }, []);
  
  
  
  const withUser = (Component, user) => {
    return (props) => <Component {...props} user={user} />;
  };

  return (
    <div className={!show1 ? "hidden min-h-screen bg-blue-gray-50/50" : "min-h-screen bg-blue-gray-50/50"} >
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar user={user} username={username} />
       {/* <Configurator /> 
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
     <Routes>
      {routes.map(
        ({ layout, pages }) =>
          layout === "dashboard" &&
          pages.map(({ path, element }) => (
            <Route
              key={path}
              exact
              path={path}
              element={React.cloneElement(element, { user })}
            />
          ))
      )}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
      { /* <Routes>
         {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route  
                exact   
                path={path}   
                element={element} 
                />
              ))
          )} 
         
          
          
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>*/}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
