const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");
require("dotenv").config();

// Initialize Dropbox client with your access token
const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch,
});

function uploadFileToDropbox(buffer, fileName, folder) {
  console.log(folder);
  const path = folder ? `/${folder}/${fileName}` : "/" + fileName;
  console.log("Uploading file to Dropbox:", path);
  return dbx
    .filesUpload({
      path,
      contents: buffer,
    })
    .then((response) => {
      console.log("File uploaded:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
}

async function listFilesInFolder(folderPath) {
  console.log("Listing files in folder:", folderPath);
  const res = await dbx.filesListFolder({ path: folderPath });
  const files = res.result.entries;
  return files;
}

async function getTemporaryLink(path) {
    console.log("Getting temporary link for file:", path);
  try {
    const response = await dbx.filesGetTemporaryLink({ path });
    console.log("Temporary link:", response.result.link);
    return response.result.link; // This is the direct URL to the file
  } catch (error) {
    console.error("Error getting temporary link:", error);
    throw error;
  }
}

module.exports = { uploadFileToDropbox, listFilesInFolder, getTemporaryLink };
