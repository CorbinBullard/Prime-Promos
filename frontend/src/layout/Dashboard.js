import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { csrfFetch } from "../utils/csrf";
import { useSession } from "../context/Session";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("My Account", "account", <UserOutlined />, [
    getItem("Logout", "logout"),
  ]),
  getItem("Projects", "projects", <PieChartOutlined />),
  getItem("My Team", "members", <TeamOutlined />), // Owner Only
];

export default function Dashboard() {
  const { user, logout } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("No user found in Dashboard")
      navigate("/login");
    }
  }, [user]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = async (e) => {
    const { key } = e;
    if (key === "logout") {
      logout();
      return;
    }
    navigate(`/${key}`);
  };

  return (
    <Layout style={{ maxHeight: "100vh", minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          // defaultSelectedKeys={[`${location.pathname.split("/")[2] || ""}`]}
          mode="inline"
          items={items}
          theme="light"
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            marginBottom: "1rem",
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
            padding: "2rem",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Prime Promos ©{new Date().getFullYear()} Venessa Mora
        </Footer>
      </Layout>
    </Layout>
  );
}
