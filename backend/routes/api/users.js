const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Sequelize = require("sequelize");
const { google } = require("googleapis");
const { sendEmail } = require("../../utils/nodemailer");
const { requireAuth, requireOwnerAuth } = require("../../utils/auth");

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

  const subject = "Register your Prime-Promos account";
  const text = "This is a test email sent using OAuth2 authentication.";

  const user = await User.create({
    email,
    validated: false,
    invitationToken,
    tokenExpiration,
  });

  const link = `https://localhost:3000/register/${invitationToken}`;

  try {
    await sendEmail(email, subject, text, link);
    res.json("Invitation sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send invitation email" });
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
