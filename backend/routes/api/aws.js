const router = require("express").Router();
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3 } = require("../../utils/aws");

router.get("/generate-presigned-url", async (req, res) => {
  // Define bucket and key. You could use query parameters or a body payload to customize these values.
  const bucketName = process.env.AWS_BUCKET_NAME;
  const key = `uploads/${req.query.fileName}`; // Example key - customize as needed

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      // Optionally, add other conditions, like ContentType
    });

    // Generate the pre-signed URL
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL expires in 1 hour

    return res.json(url);
  } catch (error) {
    console.error("Error generating pre-signed URL", error);
    return res.status(500).send("Error generating pre-signed URL");
  }
});

router.delete("/delete-file", async (req, res) => {
  const fileName = req.query.fileName;
  const bucketName = process.env.AWS_BUCKET_NAME;

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: `uploads/${fileName}`,
    });
    await s3.send(command);
    res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error("Failed to delete file from S3", error);
    res.status(500).send("Failed to delete file");
  }
});

module.exports = router;
