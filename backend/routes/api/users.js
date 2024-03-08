const express = require("express");
const router = express.Router();
require("dotenv").config();
const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Sequelize = require("sequelize");
const { sendEmail } = require("../../utils/nodemailer");
const { requireAuth, requireOwnerAuth } = require("../../utils/auth");

// Get all users TESTING ONLY
router.get("/unscoped", requireOwnerAuth, async (req, res) => {
  const users = await User.unscoped().findAll();
  res.json(users);
});

// Get all users
router.get("/", requireOwnerAuth, async (req, res) => {
  const users = await User.findAll({
    where: { role: { [Sequelize.Op.not]: "owner" } },
  });
  res.json(users);
});

// Get pending user by token
router.get("/register/:token", async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    where: {
      invitationToken: token,
      tokenExpiration: {
        [Sequelize.Op.gt]: new Date(),
      },
    },
  });
  if (!user) {
    return res.status(400).json("Invalid or expired token");
  }
  return res.json(user);
});

// Invite new User
router.post("/invite", requireOwnerAuth, async (req, res) => {
  const { email, firstName, lastName, role } = req.body;
  const invitationToken = crypto.randomBytes(20).toString("hex");
  const tokenExpiration = new Date(Date.now() + 48 * 3600000); // 48 hours from now

  const subject = "Register your Prime-Promos account";
  const text = "This is a test email sent using OAuth2 authentication.";

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  // change this for production
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const link = `${baseUrl}/register/${invitationToken}`;

  try {
    const user = await User.create({
      email,
      validated: false,
      invitationToken,
      tokenExpiration,
      firstName,
      lastName,
      role,
    });
    await sendEmail(email, subject, text, link);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send invitation email" });
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
});

// Delete a user
router.delete("/:id", requireOwnerAuth, async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
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
