const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Sequelize = require("sequelize");

const { requireAuth, requireOwnerAuth } = require("../../utils/auth");
const { link } = require("fs");
// const { sendInvitationEmail } = require("../../utils/nodemailer");

// Get all users TESTING ONLY
router.get("/", requireOwnerAuth, async (req, res) => {
  const users = await User.unscoped().findAll();
  res.json(users);
});

// Invite new User
router.post("/invite", requireOwnerAuth, async (req, res) => {
  const { email } = req.body;
  // console.log("email ", email);
  const invitationToken = crypto.randomBytes(20).toString("hex");
  const tokenExpiration = new Date(Date.now() + 48 * 3600000); // 48 hours from now

  // Change this to a real smtp service with gmail
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "troy.roob@ethereal.email",
      pass: "FNREzbEWVvnMg6GGhu",
    },
  });

  try {
    await User.create({
      email,
      validated: false,
      invitationToken,
      tokenExpiration,
    });

    const link = `http://localhost:3000/register/${invitationToken}`;
    // await sendInvitationEmail(email, link); // Implement this function based on your email service

    const info = await transporter.sendMail({
      from: "Prime-Promos", // sender address
      to: email, // list of receivers
      subject: "Create Account", // Subject line
      text: invitationToken, // plain text body !! MUST CHANGE THIS LINE !!
      html: `<b><a href="${link}">Link</a></b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    res.send("Invitation sent successfully.");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// user registration
router.post("/register", async (req, res) => {
  const { token, password, firstName, lastName } = req.body;

  // try {
  const user = await User.findOne({
    where: {
      invitationToken: token,
      tokenExpiration: {
        [Sequelize.Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    return res.status(400).send("Invalid or expired token");
  }
  const hashedPassword = await bcrypt.hashSync(password);

  await user.update({
    hashedPassword,
    validated: true,
    invitationToken: null,
    tokenExpiration: null,
    firstName,
    lastName,
  });

  return res.json("User registered successfully");
  // } catch (error) {
  //   res.status(500).send("Server error");
  // }
});

// Delete a user
router.delete("/:id", requireOwnerAuth, async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    err.title = "User not found";
    err.errors = ["User not found"];
    return next(err);
  }
  await user.destroy();
  return res.json({ message: "User deleted" });
});

module.exports = router;
