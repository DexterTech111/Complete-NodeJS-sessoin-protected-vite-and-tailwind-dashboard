import {useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { KeyInput1  } from "@/widgets/form";
import { platformSettingsData, conversationsData, projectsData } from "@/data";

//const dotenv = require('dotenv');

export function Profile({}) {


  const [user1, setUserdata1] = useState({});
  const [profile, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
   
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
    
    //alert(username);
  }, [username]); // Dependency on username, but the effect runs only when it's empty
  
  
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={profile || '../img/user.png'}
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {username != "" ? username : "Name" }
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Admin 
                </Typography>
              </div>
            </div>
           {/* <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div> */}
          </div>
          <div className=" gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            
            <div className=' border-t pt-5 '>
                <div className=' '>
                
                    <Typography
                    variant="h6"
                    className="pt-4 block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize "
                    >
                      Username:
                      <span className="pl-4 antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">{user1.username}</span>
                    </Typography>
                    <Typography
                    variant="h6"
                    className="pt-4 block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize "
                    >
                      Email:
                      <span className="pl-4 antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">{user1.email}</span>
                    </Typography>
                    <Typography
                    variant="h6"
                    className="pt-4 block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize "
                    >
                      Phone:
                      <span className="pl-4 antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">Tel</span>
                    </Typography>
                    
                    
                    
                   
                     
                    
                </div>
                
               {/* <Typography
                    variant="h4"
                    className="pt-4 block antialiased  font-sans text-base leading-normal text-blue-gray-900 font-bold capitalize "
                    >
                      API's
                 </Typography> */}
                <div className=' w-full justify-start text-start'>
                  <KeyInput1 />
                </div>
            </div>
         
                        
            <div className='border-1'>
        
            </div>
            
            
        {/* <ProfileInfoCard
              title="Profile Information"
              description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              details={{
                "first name": user1.username,
                mobile: "Tel",
                email: user1.email,
                location: "USA",
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />*/}
           {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: "text-sm font-normal text-blue-gray-500",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>*/}

           {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div>*/}
          </div>
        
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
