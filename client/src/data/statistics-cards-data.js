import {
  UserGroupIcon,
  LinkIcon,
  DocumentTextIcon,
  CloudIcon
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UserGroupIcon,
    title: "Number of Users",
    value: "4",
    footer: {
      color: "text-green-500",
      value: "1%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: LinkIcon,
    title: "Number of Active Syncs",
    value: "1",
    footer: {
      color: "text-green-500",
      value: "-5%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: DocumentTextIcon,
    title: "Number of Pages Synced",
    value: "149",
    footer: {
      color: "text-red-500",
      value: "30%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: CloudIcon,
    title: "Bandwidth Used",
    value: "1034hz",
    footer: {
      color: "text-green-500",
      value: "0.9%",
      label: "than last week",
    },
  },
];

export default statisticsCardsData;
