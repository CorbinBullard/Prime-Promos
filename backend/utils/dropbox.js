const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");
require("dotenv").config();

// Initialize Dropbox client with your access token
const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch,
});

function uploadFileToDropbox(buffer, fileName) {
  return dbx
    .filesUpload({ path: "/" + fileName, contents: buffer })
    .then((response) => {
      console.log("File uploaded:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
}

module.exports = { uploadFileToDropbox };
