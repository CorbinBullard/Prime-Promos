import { Flex } from "antd";
import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectCardsContainer({ projects }) {

  const projectsArray = Object.values(projects);
  return (
    <Flex>
      {projectsArray.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </Flex>
  );
}
