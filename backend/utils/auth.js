const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User, Project } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  // Create the token.
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ["email", "createdAt", "updatedAt"],
        },
      });
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

const requireAuth = function (req, _res, next) {
  if (req.user) return next();
  console.log("requireAuth middleware: no user found");

  const err = new Error("Authentication required");
  err.title = "Authentication required";
  err.errors = { message: "Authentication required" };
  err.status = 401;
  return next(err);
};
const requireAdminAuth = function (req, _res, next) {
  if (!req.user) {
    console.log("requireAuth middleware: no user found");
    const err = new Error("Authentication required");
    err.title = "Authentication required";
    err.errors = { message: "Authentication required" };
    err.status = 401;
    return next(err);
  }
  if (req.user.role !== "admin" && req.user.role !== "owner") {
    console.log("requireAuth middleware: User is not an admin or owner");
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = { message: "Unauthorized" };
    err.status = 401;
    return next(err);
  }
  return next();
};
const requireOwnerAuth = function (req, _res, next) {
  if (!req.user) {
    console.log("requireAuth middleware: no user found");
    const err = new Error("Authentication required");
    err.title = "Authentication required";
    err.errors = { message: "Authentication required" };
    err.status = 401;
    return next(err);
  }
  if (req.user.role !== "owner") {
    console.log("requireAuth middleware: User is not an owner");
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = { message: "Unauthorized" };
    err.status = 401;
    return next(err);
  }
  return next();
};
const validateProjectUser = async (req, res, next) => {
  const { projectId } = req.params;
  const { user } = req;
  const { role } = user;
  const project = await Project.findByPk(projectId, {
    include: User,
    required: false,
  });

  if (!project) {
    return res.json({ message: "Project not found" });
  }
  if (
    role !== "admin" &&
    role !== "owner" &&
    !project.Users.find((u) => u.id === user.id)
  ) {
    return res.json({ message: "Unauthorized" });
  }
  return next();
};

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  requireOwnerAuth,
  requireAdminAuth,
  validateProjectUser,
};
