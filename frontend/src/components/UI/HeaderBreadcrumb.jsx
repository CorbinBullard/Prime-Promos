import { Breadcrumb } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/utilFunctions";

export default function HeaderBreadcrumb() {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/").filter((path) => path !== "");
  const breadcrumbItems = pathArray.map((path) => ({
    key: `/${path}`,
    title: capitalize(path),
  }));
  return <Breadcrumb items={breadcrumbItems} />;
}
