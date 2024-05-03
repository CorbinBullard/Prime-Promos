const router = require("express").Router();
const { sendEmail } = require("../../utils/nodemailer");

router.post("/", async (req, res) => {
  const { email, subject, text, html } = req.body;

  try {
    await sendEmail(email, subject, text, html);
    return res.json({ message: "Email sent" });
  } catch (error) {
    console.error("Error sending email", error);
    return res.status(500).send("Error sending email");
  }
});

module.exports = router;
