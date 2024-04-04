import { Button } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set the workerSrc property to ensure PDF.js worker is loaded
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handlePageSelect = (offset) => {
    const newPage = currentPage + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Button onClick={() => handlePageSelect(-1)}>PREVIOUS</Button>
      <Button onClick={() => handlePageSelect(1)}>NEXT</Button>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{ workerSrc: "/pdf.worker.min.js" }}
      >
        <Page pageNumber={currentPage} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
};

export default PDFViewer;
