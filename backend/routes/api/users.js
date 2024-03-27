const express = require("express");
const router = express.Router();
require("dotenv").config();
const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Sequelize = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    console.log("\nUser already exists\n");
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

// Resend invitation
router.put("/invite/:id", requireOwnerAuth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const invitationToken = crypto.randomBytes(20).toString("hex");
  const tokenExpiration = new Date(Date.now() + 48 * 3600000); // 48 hours from now

  const subject = "Register your Prime-Promos account";
  const text = "This is a test email sent using OAuth2 authentication.";

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const link = `${baseUrl}/register/${invitationToken}`;

  try {
    await user.update({
      invitationToken,
      tokenExpiration,
    });
    await sendEmail(user.email, subject, text, link);
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

  return res.json(user);
});

// Google Register
router.post("/google-register", async (req, res) => {
  console.log("\nREQ : ", req.body, "\n");
  const { response, token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: response.credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const email = payload.email;
  const firstName = payload.given_name;
  const lastName = payload.family_name;
  const profileImageUrl = payload.picture;

  console.log("\nPAYLOAD : ", payload, "\n");

  const user = await User.findOne({
    where: {
      email,
      invitationToken: token,
      tokenExpiration: {
        [Sequelize.Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    return res.status(400).send("Invalid or expired token");
  }

  await user.update({
    validated: true,
    invitationToken: null,
    tokenExpiration: null,
    firstName,
    lastName,
    profileImageUrl,
  });

  return res.json(user);
});

// Delete a user
router.delete("/:id", requireOwnerAuth, async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await user.destroy();
  return res.json({ message: "User deleted" });
});

module.exports = router;
