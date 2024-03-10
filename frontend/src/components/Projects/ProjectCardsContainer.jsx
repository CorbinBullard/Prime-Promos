import { Flex } from "antd";
import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectCardsContainer({ projects }) {
  return (
    <Flex>
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </Flex>
  );
}
