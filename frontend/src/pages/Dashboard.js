import React, { useMemo } from "react";
import {
  Avatar,
  Calendar,
  Card,
  Col,
  Divider,
  Flex,
  List,
  Row,
  Space,
  Statistic,
} from "antd";
import { useProjects } from "../hooks/useProjects";
import { useTeam } from "../context/useTeam";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import VerticalBlock from "../components/DashboardComponents/VerticalBlock";
import { Link } from "react-router-dom";
import UserIcon from "../components/Members/UserIcon";

export default function Dashboard() {
  const { projects } = useProjects();
  const { teamMembers } = useTeam();

  const dashboardData = useMemo(() => {
    const dataObj = {
      projects: { active: [], completed: [], archived: [] },
      members: { active: [], pending: [] },
    };
    projects?.forEach((project) => {
      dataObj.projects[project.status].push(project);
    });
    for (const key in dataObj.projects) {
      dataObj.projects[key] = dataObj.projects[key].sort(
        (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
      );
    }

    teamMembers?.forEach((member) => {
      if (member.validated) {
        dataObj.members.active.push(member);
      } else {
        dataObj.members.pending.push(member);
      }
    });
    return dataObj;
  }, [projects, teamMembers]);

  console.log("Dashboard : ", dashboardData);

  return (
    <>
      <Row gutter={15}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Active Projects"
              value={dashboardData.projects.active.length}
            />
          </Card>
        </Col>
        {/* Replace with Previous projects for Non-admins/owner? */}
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Active Users"
              value={dashboardData.members.active.length}
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={15}>
        <Col span={8}>
          <VerticalBlock
            header={
              <Flex gap={10}>
                <CalendarOutlined style={{ fontSize: "1.5rem" }} />
                <h2>Upcoming Events</h2>
              </Flex>
            }
            data={dashboardData.projects.active}
            renderItem={(project) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={50}
                      shape="square"
                      style={{ backgroundColor: "#87d068" }}
                    >
                      {dayjs(project.eventDate).format("MMM DD")}
                    </Avatar>
                  }
                  title={
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                  }
                  description={`In Hands Date: ${dayjs(
                    project.inHandsDate
                  ).format("MMM DD")}`}
                />
                <Avatar.Group maxCount={4}>
                  {project.Users.map((user) => (
                    <UserIcon user={user} />
                  ))}
                </Avatar.Group>
              </List.Item>
            )}
          />
        </Col>
        <Col span={8}>
          <VerticalBlock
            header={
              <Flex gap={10}>
                <UsergroupAddOutlined style={{ fontSize: "1.5rem" }} />
                <h2>Pending Users</h2>
              </Flex>
            }
            data={dashboardData.members.pending}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<UserIcon user={user} />}
                  title={user.firstName + " " + user.lastName}
                  description={user.email}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
