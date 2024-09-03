import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function Connections() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];
  const [type, setType] = React.useState("card");

  return (
    <div className="mx-auto my-10 flex max-w-screen-lg flex-col gap-8">
      {/*<Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Alerts
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          {alerts.map((color) => (
            <Alert
              key={color}
              open={showAlerts[color]}
              color={color}
              onClose={() => setShowAlerts((current) => ({ ...current, [color]: false }))}
            >
              A simple {color} alert with an <a href="#">example link</a>. Give
              it a click if you like.
            </Alert>
          ))}
        </CardBody>
      </Card>*/}
    
      
     
    <Card color="transparent" className="text-center p-6 mx-auto max-w-lg" shadow={false}>
  {/* Card Header */}


  <Alert
    key="orange"
    open={showAlertsWithIcon["orange"]}
    color="orange"
    icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
    onClose={() => setShowAlertsWithIcon((current) => ({
      ...current,
      ["orange"]: false,
    }))}
  >
    This Page is under construction!
  </Alert>

  <Typography variant="h4" color="blue-gray" className="mt-6">
    Edit Confluence Connections
  </Typography>
  <Typography color="gray" className="mt-1 font-normal">
    Feel free to sync spaces from different Confluence accounts
  </Typography>

  <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Atlassian Link
      </Typography>
      <Input
        size="lg"
        placeholder="yourname.atlassian.net/wiki"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />

      <Typography variant="h6" color="blue-gray" className="-mb-3">
        New API Token
      </Typography>
      <Input
        size="lg"
        placeholder="Enter token here"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>

    <Button className="mt-6" fullWidth>
      Test and Save
    </Button>
  </form>
</Card>

    </div>
  );
}

export default Connections;
