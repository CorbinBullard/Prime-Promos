import { Flex } from "antd";
import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectCardsContainer({ projects }) {
  return (
    <Flex gap={8}>
      {projects &&
        projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
    </Flex>
  );
}
