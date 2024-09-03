import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useEffect, useState } from 'react';

export function UserView() {
  
  const [user1, setUser] = useState([]);
  const [userSet, setisUserSet] = useState(false);
  useEffect(() => {
    
    ///
    ///
        // Fetch available spaces from Confluence API through the backend
        const fetchUsers = async () => {
          try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const config = {
              headers: {
                Authorization: `Bearer ${storedUser.token}`,
              },
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/auth/user-list`, {
              method: 'GET',
              headers: config.headers,
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            console.log(data);
            setUser(data); // Set the fetched spaces to the spaces state
            setisUserSet(true);
          } catch (error) {
            console.error(error); // Log any errors that occur during the fetch
          }
        };
        
    ///
    ///
   
  ///
  ///
  ///
  // Only run the effect if username has not been set

   if(!userSet){
    fetchUsers();
      }
      
}, [  userSet]);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
           Users Table
          </Typography>
        </CardHeader>
        <CardBody className=" px-0 pt-0 pb-2">
        <table className="w-full mx-6 min-w-[640px] table-auto">
            <thead>
              <tr>
                <th  className="border-b border-blue-gray-50 py-3 px-5 text-left"  >                              
                      <Typography   variant="small"  className="text-[11px] font-bold uppercase text-blue-gray-400"         >
                      Users
                      </Typography>
                </th>
                <th className="border-b">
                  
                </th>
               
              </tr>
            </thead>
            <tbody className="p-6 m-6">
            { user1.map(user => (
          <tr key={user._id} ch>
            {/* py-3 px-5 */}
            <td className="border-b py-3 border-blue-gray-50">
              <div className="flex items-center gap-4">
                <Avatar src={user.image || '../img/user.png'} alt={user.username} size="sm" variant="rounded" />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {user.username || 'No Name'}
                  </Typography>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {user.email}
                  </Typography>
                </div>
              </div>
            </td>
            <td className="border-b border-blue-gray-50">
              <Typography className="text-xs font-semibold text-blue-gray-600">
                Status
              </Typography>
              <Typography className="text-xs font-normal text-blue-gray-500">
                Active {/* Or any status logic you want */}
              </Typography>
            </td>
            {/* 
            Uncomment the following code if needed
            <td className={className}>
              <Chip
                variant="gradient"
                color={user.online ? "green" : "blue-gray"}
                value={user.online ? "online" : "offline"}
                className="py-0.5 px-2 text-[11px] font-medium w-fit"
              />
            </td>
            <td className={className}>
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {user.date} {/* Assuming user.date is a valid date field 
              </Typography>
            </td>
            <td className={className}>
              <Typography
                as="a"
                href="#"
                className="text-xs font-semibold text-blue-gray-600"
              >
                Edit
              </Typography>
            </td> 
            */}
          </tr>
        ))}

                    <tr >
                      {/*py-3 px-5*/}
                      <td className="border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <Avatar src="" alt="" size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              Name
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              Email
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          Status
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          Active
                        </Typography>
                      </td>
                     {/* <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>*/}
                    </tr>
                  
            </tbody>
          </table>
         {/* <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>*/}
        </CardBody>
      </Card>
     {/* <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            User Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "gray"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>*/}
    </div>
  );
}

export default UserView;
