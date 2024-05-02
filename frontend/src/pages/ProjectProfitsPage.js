import { Flex, Space, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/UI/BackButton";
import ProjectProfits from "../components/Projects/ProjectProfits";
import { useSession } from "../context/Session";
import useItems from "../hooks/useItems";
import ProjectTitle from "../components/UI/ProjectTitle";
import ProjectPDFViewer from "../components/Projects/PDF/ProjectPDFViewer";

export default function ProjectProfitsPage() {
  const { projectId } = useParams();
  const { isOwner } = useSession();
  const navigate = useNavigate();
  const { items, currentProject, itemsLoading } = useItems({ projectId });

  useEffect(() => {
    if (!isOwner) {
      // Redirect to projects page if user is not the owner
      navigate("/projects");
    }
  }, [isOwner, navigate]);
  console.log(items, currentProject);

  const pdfProjectObj = useMemo(() => {
    if (!items || !currentProject) return {};
    const project = currentProject;
    project.Items = items;
    return project;
  }, [currentProject, items]);

  console.log(pdfProjectObj);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {!itemsLoading && currentProject && (
        <Flex vertical style={{ width: "100%" }}>
          <Flex justify="space-between" align="center">
            <BackButton text="Projects" type="text" link="/projects" />
            <ProjectTitle project={currentProject} />
            <Typography.Title level={2}>Profits</Typography.Title>
          </Flex>

          <Flex gap={10}>
            <div style={{ width: "50%" }}>
              <ProjectProfits project={pdfProjectObj} />
            </div>
            <div style={{ width: "50%" }}>
              <ProjectPDFViewer project={pdfProjectObj} />
            </div>
          </Flex>
        </Flex>
      )}
    </Space>
  );
}
