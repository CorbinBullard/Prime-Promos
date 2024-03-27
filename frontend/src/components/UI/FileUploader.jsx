import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { csrfFetch } from "../../utils/csrf";
import PDFViewer from "./PDFViewer";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FileUploader = ({ callback, initialUrl }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(
    initialUrl
      ? [
          {
            uid: "-1", // Ensure a unique ID
            name: initialUrl.split("/uploads/")[1].split("%20").join(" "), // Optionally set a meaningful name
            status: "done",
            url: initialUrl,
          },
        ]
      : []
  );

  const handleChange = async ({ file, fileList: newFileList }) => {
    // Scenario 1: File is being uploaded or just finished uploading
    if (file.status === "uploading" || file.status === "done") {
      // For single file scenarios, ensure only the latest file is in the list
      // and set its status to 'done' to reflect the upload completion
      const latestFile = {
        ...file,
        status: "done", // Ensure the file is marked as done
        url: file.url, // Construct or use the existing URL
      };

      setFileList([latestFile]); // Keep the fileList to the single, latest file

      // If file upload is successful and a callback is provided, call it
      if (file.status === "done" && callback) {
        callback(file.url); // Use the actual URL or the one you construct
      }
    }
    // Scenario 2: File is removed from the list
    else if (newFileList.length === 0 && fileList.length > 0) {
      // Previous file is being removed, initiate deletion logic
      await handleDelete(fileList[0]); // Pass the current file to handleDelete
      setFileList([]); // Clear the fileList as the file is removed
    }
    // General case: Update fileList based on user actions
    else {
      setFileList(newFileList);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await csrfFetch(
      `/api/aws/generate-presigned-url?fileName=${encodeURIComponent(
        file.name
      )}`
    );
    const url = await response.json();

    const uploadResponse = await csrfFetch(url, {
      method: "PUT",
      body: file,
    });

    if (uploadResponse.ok) {

      // Construct the file access URL
      const fileUrl = `${
        process.env.REACT_APP_S3_BUCKET_URL
      }/uploads/${encodeURIComponent(file.name)}`;
      onSuccess(fileUrl, file); // Make sure to pass the URL here

      // Update the fileList to include the new file
      setFileList([
        {
          uid: file.uid, // Use the same uid
          name: file.name,
          status: "done",
          url: fileUrl, // Use the constructed URL
        },
      ]);

      // Call the callback with the file URL
      callback(fileUrl);
    } else {
      console.error("Upload failed");
      onError(new Error("Upload failed"));
    }
  };

  const handleDelete = async (file) => {
    // Extract the file key from the URL
    // This depends on how you're structuring your S3 URLs
    const fileKey = file.url.split("/").pop();

    try {
      await csrfFetch(
        `/api/aws/delete-file?fileName=${encodeURIComponent(fileKey)}`,
        {
          method: "DELETE",
        }
      );
      console.log("File deleted successfully");
      callback(null); // Notify parent component
      setFileList([]);
    } catch (error) {
      console.error("Failed to delete file", error);
    }
  };

  return (
    <>
      <Upload
        maxCount={1}
        multiple={false}
        customRequest={handleUpload}
        onPreview={handlePreview}
        fileList={fileList}
        onChange={handleChange}
        onRemove={handleDelete}
        progress={{ strokeColor: { "0%": "#108ee9", "100%": "#87d068" } }}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        width={700}
      >
        {fileList.length && <PDFViewer file={previewImage} />}
      </Modal>
    </>
  );
};

export default FileUploader;
