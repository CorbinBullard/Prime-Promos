import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// You need to manually set the workerSrc to point to the PDF.js worker script.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Set the initial page to the first page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  console.log(numPages, pageNumber, file);
  return (
    // <div>
    <div style={{ overflow: "auto", width: "100%" }}>
      <Document
        file={file}
        // onLoadSuccess={onDocumentLoadSuccess}
        // options={{ workerSrc: "/pdf.worker.js" }}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
    //   <div>
    //     <p>
    //       Page {pageNumber} of {numPages}
    //     </p>
    //     <button
    //       onClick={() => setPageNumber(pageNumber - 1)}
    //       disabled={pageNumber <= 1}
    //     >
    //       Previous
    //     </button>
    //     <button
    //       onClick={() => setPageNumber(pageNumber + 1)}
    //       disabled={pageNumber >= numPages}
    //     >
    //       Next
    //     </button>
    //   </div>
    // </div>
  );
}

export default PDFViewer;
