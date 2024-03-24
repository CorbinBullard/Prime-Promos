// Use Drawer Manager to manage the drawer in the ManageProjectDrawer component.

import ManageUsersTab from "./Tabs/ManageUsersTab";

export const projectManagerTabs = (project) => [
  {
    key: "users",
    label: "Manage Users",
    children: <ManageUsersTab project={project} />,
  },
];
