import { Flex } from "antd";
import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectCardsContainer({ projects, selectProject }) {
  return (
    <Flex gap={8} wrap="wrap">
      {projects &&
        projects.map((project) => (
          <ProjectCard project={project} key={project.id} selectProject={selectProject} />
        ))}
    </Flex>
  );
}
