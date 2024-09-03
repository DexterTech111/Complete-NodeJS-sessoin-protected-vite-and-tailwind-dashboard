import React, { useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button,
  Checkbox,
  Chip,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
 
} from "@/data";
import { CheckCircleIcon, ClockIcon, TableCellsIcon  } from "@heroicons/react/24/solid";

export function Home({user}) {
  
  const [user1, setUserdata1] = useState({});
  const [CardsData, setCards] = useState([]);
  const [cardSet, setCardSet] = useState("no");
  //const [username, setUsername] = useState("");
  //const user = userDetails.user;
  const [spaces, setSpaces] = useState([]); // State to store available Confluence spaces
  const [spaceSet, setSpaceSet] = useState(false);
  const [selectedSpaces, setSelectedSpaces] = useState([]); // State to store selected spaces for syncing
  const [syncedData, setSyncedData] = useState([]); // State to store the data after syncing spaces
  

  
  

 

  const handleSync = async () => {
    // Handle the sync process when the sync button is clicked
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          'Content-Type': 'application/json', // Ensure the correct content type
        },
      };
      //alert(selectedSpaces);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/confluence/sync-spaces`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ selectedSpaces }), // Convert the data to JSON string
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setSyncedData(data); // Set the synced data to the syncedData state
      
      setSpaceSet(true);
      console.log(data); // Log the synced data for debugging
    } catch (error) {
      console.error(error); // Log any errors that occur during the sync process
    }
  };
  

  const handleSelectSpace = (spaceKey) => {
    // Handle the selection and deselection of spaces
    setSelectedSpaces(prevState =>
      prevState.includes(spaceKey) ? prevState.filter(key => key !== spaceKey) : [...prevState, spaceKey]
    );
    
  };
  
  useEffect(() => {
    
    const fetchSpaces = async () => {
      try {
        //const user = JSON.parse(localStorage.getItem('user'));
       
       
         //alert(user.username);
         //alert(user.token);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/confluence/spaces`, {
            method: 'GET',
            headers: config.headers,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data.results);
          setSpaces(data.results); // Set the fetched spaces to the spaces state
          setSpaceSet(true); // Ensure spaceSet is set to true after data is fetched
          console.log('props1:' + user.username);
        
      } catch (error) {
        console.error(error); // Log any errors that occur during the fetch
      }
    };
  
    const getCount = async () => {
      try {
        //const storedUser = JSON.parse(localStorage.getItem('user'));
        
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
  
          const profileResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}api/auth/user-count`, {
            method: 'GET',
            headers: config.headers,
          });
  
          const jsonArray = await profileResponse.json();
          console.log(jsonArray.data);
  
          // Map through the array and update the values
          const updatedArray = statisticsCardsData.map((item, index) => {
            return {
              ...item,
              value: jsonArray.data[index].count.toString(), // Updating the value property
              footer: {
                ...item.footer,
                value: jsonArray.data[index].value.toString(), // Updating the footer.value property
              },
            };
          });
          setCards(updatedArray);
          setCardSet("yes"); // Ensure cardSet is set to true after data is fetched
       
      } catch (secondError) {  
        console.error("Error fetching profile with token:", secondError);     
      }
    }
  
    // Fetch spaces and user counts on initial render
    if (!spaceSet) {
      fetchSpaces();
    }
  
    if (cardSet ==="no") {
      getCount();
    }
  
  }, [spaceSet, cardSet, statisticsCardsData, user]); // Use spaceSet, cardSet, and statisticsCardsData as dependencies
  
  
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {CardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
    
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Select Spaces
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">

                {spaces.map(space => (
              
                  ////
                  ////
                  ////
                  <div key={space.key}  className="flex items-start gap-4 py-3">
                        <div
                          className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] after:h-0
                            
                          }`}
                        >
                        <Checkbox
                      type="checkbox"
                      checked={selectedSpaces.includes(space.key)}
                      onChange={() => handleSelectSpace(space.key)} // Toggle space selection
                      className="mr-2"
                    />
                        </div>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="block font-medium"
                          >
                            {space.name}
                          </Typography>
                          <Typography
                            as="span"
                            variant="small"
                            className="text-xs font-medium text-blue-gray-500"
                          >
                            {space.id} {space.status}
                          </Typography>
                        </div>
                      </div>
                  ////
                  ////
                  /////
                ))}
          
          
                <Button
                  className="bg-gray-700 p-4 rounded font-sans bg-black text-white mt-6 hover:bg-gray-600"
                  onClick={handleSync}
                >
                  
                  Sync Selected Spaces
                </Button>
          

          </CardBody>
        </Card>
        
      
        <Card className="overflow-hidden xl:col-span-2 border pt-8 border-blue-gray-100 shadow-sm">
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
           Synced Spaces & Pages
          </Typography>
        </CardHeader>
        <CardBody className={`px-0 pt-0 pb-2 ${!spaceSet ? '' : 'overflow-x-scroll'}`}>
         

           {!spaceSet ? 
           <div className="text-center justify-center w-full  mt-3">
             <Typography variant="h6" color="black">
            No Syncs Yet!, Please select spaces to sync
           </Typography> 
           </div>
           :
           
            syncedData.map(space => (
            
              
                <table key={space.key} className="m-6 w-full min-w-[640px] mt-10 table-auto ">
                    <thead>
                    <tr>
                      
                      <th className="text-left " >{space.name}</th>
                      <th className="text-center w-1/4">Status</th>
                    </tr>
                  </thead>
                  <Progress
                              value="60"
                              variant="gradient"
                              color="blue"
                              className="h-1 mb-5"
                            />
                  <tbody>
                  
                  {space.pages.map(page => (
                      <tr  key={page.id} className="w-fit border-b" >
                            <td className="py-3 px-5  border-blue-gray-50">
                              <div className="flex items-center gap-4">
                              <TableCellsIcon className="w-5 h-5 text-inherit" />
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {page.title}
                                  </Typography>
                                  <Typography className="text-xs font-normal text-blue-gray-500">
                                    {page.id}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className="flex text-center justify-center ">
                              <Chip
                                variant="gradient"
                                color="green"
                                value={page.status}
                                className="py-0.5 text-[11px] font-medium  "
                              />
                            </td>
                      </tr>              
                    ))}
                  </tbody>
              </table>
             
            
            ))
            
            }
         
        </CardBody>
      </Card>
        

      </div>
      {/*<div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>*/}
    </div>
  );
}

export default Home;
