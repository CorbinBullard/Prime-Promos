import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectProfitsPage() {
  const { projectId } = useParams();
  return <div>PROFITS {projectId}</div>;
}
