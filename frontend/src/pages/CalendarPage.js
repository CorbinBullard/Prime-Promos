import { Calendar, List, Tag } from "antd";
import React, { useMemo } from "react";
import { useProjects } from "../hooks/useProjects";
import dayjs from "dayjs";
import { capitalize } from "../utils/utilFunctions";

export default function CalendarPage() {
  const { projects } = useProjects();

  const projectsObj = useMemo(() => {
    if (!projects) return {};
    const obj = {};
    projects.forEach((project) => {
      const inHands = dayjs(project.inHandsDate).format("YYYY-MM-DD");
      const event = dayjs(project.eventDate).format("YYYY-MM-DD");

      if (obj[inHands]) {
        obj[inHands].push({ ...project, type: "inHands" });
      } else {
        obj[inHands] = [{ ...project, type: "inHands" }];
      }
      if (obj[event]) {
        obj[event].push({ ...project, type: "event" });
      } else {
        obj[event] = [{ ...project, type: "event" }];
      }
    });
    return obj;
  }, [projects]);

  const cellRender = (value) => {
    const projects = projectsObj[value.format("YYYY-MM-DD")];
    
    if (!projects) return null;
    return (
      <List>
        {projects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta
              title={project.name}
              description={
                <Tag color={project.type === "inHands" ? "yellow" : "green"}>
                  {capitalize(project.type)}
                </Tag>
              }
            />
          </List.Item>
        ))}
      </List>
    );
  };

  return <Calendar cellRender={cellRender} />;
}
