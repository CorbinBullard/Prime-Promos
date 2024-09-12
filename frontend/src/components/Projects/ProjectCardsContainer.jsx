import { Flex, Empty } from "antd";
import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectCardsContainer({ projects, selectProject }) {
  console.log("Projects: ", projects);
  return (
    <Flex gap={8} wrap="wrap">
      {projects && !projects.length && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{marginLeft: "5rem"}}/>
      )}
      {projects &&
        projects.map((project) => (
          <ProjectCard
            project={project}
            key={project.id}
            selectProject={selectProject}
          />
        ))}
    </Flex>
  );
}
