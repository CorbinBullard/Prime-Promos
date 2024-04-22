// Use Drawer Manager to manage the drawer in the ManageProjectDrawer component.
import ManageUsersTab from "./Tabs/ManageUsersTab";
import EditProject from "./Tabs/EditProjectTab";
import ArchivedProjectPDF from "../Archived/ArchivedProjectPDF";
import { PDFViewer } from "@react-pdf/renderer";
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
    key: "pdf",
    label: "PDF",
    children: <ArchivedProjectPDF project={project} />,
  },
];
