import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import ProjectPDF from "./ProjectPDF";

export default function ProjectPDFViewer({ project }) {
  return (
    <PDFViewer style={{ width: "100%", height: "45rem" }}>
      <ProjectPDF project={project} />
    </PDFViewer>
  );
}
