const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");


const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("email")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Restore session user
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

//LOGIN
router.post("/", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  const data = await User.unscoped().findOne({
    where: {
      email,
    },
  });
  const user = data?.toJSON();

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { message: "The provided credentials were invalid." };
    return next(err);
  }
  if (!user.validated) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { message: "User not validated" };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

// LOGIN WITH GOOGLE
router.post("/google", async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { message: "The provided credentials were invalid." };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

//LOGOUT
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
