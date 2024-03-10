import { Card } from "antd";
import React from "react";

export default function ProjectCard({ project }) {
  const handleProjectSelect = () => {
    console.log(project);
  };
  return (
    <Card
      title={project.name}
      bordered={false}
      hoverable
      onClick={handleProjectSelect}
    ></Card>
  );
}
