import { Button, Pagination } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set the workerSrc property to ensure PDF.js worker is loaded
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Pagination
        simple
        defaultCurrent={1}
        current={currentPage}
        total={numPages}
        onChange={(page) => setCurrentPage(page)}
        pageSize={1}
      />
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        // Does not seem to be needed. Uncomment if you run into issues
        // options={{ workerSrc: "/pdf.worker.min.js" }}
      >
        <Page
          pageNumber={currentPage}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
