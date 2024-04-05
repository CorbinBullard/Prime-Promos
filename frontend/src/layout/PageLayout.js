import React, { useEffect, useState } from "react";
import {
  CalendarOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Divider, Image, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { csrfFetch } from "../utils/csrf";
import { useSession } from "../context/Session";
import HeaderComponent from "../components/UI/Header";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function PageLayout() {
  const { user, logout, isOwner } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const logoSrc = collapsed
    ? "/pp_icon_transparent.png"
    : "/pp_horizontal_logo_transparent.png";

  const items = [
    getItem("Dashboard", "", <DashboardOutlined />),
    getItem("Projects", "projects", <PieChartOutlined />),
    getItem("Calendar", "calendar", <CalendarOutlined />),
    ...(isOwner ? [getItem("My Team", "members", <TeamOutlined />)] : []), // Conditionally add this item
  ];
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorBgBase,
      colorBgLayout,
      colorBgBlur,
      colorBgMask,
      colorBgElevated,
    },
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
        <div style={{ padding: "1.3rem" }}>
          <Image
            preview={false}
            src={logoSrc}
            alt="Company Logo"
            style={{ width: "100%", display: "block" }}
          />
        </div>
        <Menu
          defaultSelectedKeys={[`${location.pathname.split("/")[1] || ""}`]}
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
            alignContent: "center",
            display: "flex",
          }}
        >
          <HeaderComponent />
        </Header>
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
