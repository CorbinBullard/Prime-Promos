// Use Drawer Manager to manage the drawer in the ManageProjectDrawer component.

import ManageUsersTab from "./Tabs/ManageUsersTab";
import EditProject from "./Tabs/EditProjectTab";
import ProjectStatusTab from "./Tabs/ProjectStatusTab";
export const projectManagerTabs = (project) => [
  {
    key: "details",
    label: "Project Details",
    children: <EditProject project={project} />,
  },
  {
    key: "users",
    label: "Manage Users",
    children: <ManageUsersTab project={project} />,
  },
  {
    key: "status",
    label: "Project Status",
    children: <ProjectStatusTab project={project} />,
  }
];
