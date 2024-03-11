import { Flex } from "antd";
import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectCardsContainer({ projects, dispatch }) {
  const projectsArray = Object.values(projects);
  return (
    <Flex gap={8}>
      {projectsArray.map((project) => (
        <ProjectCard project={project} key={project.id} dispatch={dispatch} />
      ))}
    </Flex>
  );
}
