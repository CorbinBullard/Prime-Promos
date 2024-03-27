import UserDetailsTab from "./Tabs/UserDetailsTab";


export const userManagerTabs = (user) => [
  {
    key: "details",
    label: "User Details",
    children: <UserDetailsTab user={user} />,
  },
];
