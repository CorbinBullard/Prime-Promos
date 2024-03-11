const router = require("express").Router();
const { Op } = require("sequelize");
const { Project, User } = require("../../db/models");
const { requireOwnerAuth } = require("../../utils/auth");

// Get all projects TESTING ONLY
router.get("/", async (req, res) => {
  const projects = await Project.findAll({
    include: User,
    required: false,
  });
  return res.json(projects);
});

// Create Project
router.post("/", requireOwnerAuth, async (req, res) => {
  console.log("REQ BODY", req.body);
  const { name, users } = req.body;

  try {
    // Create the project without including users in this step
    const project = await Project.create({ name });

    // Find users based on IDs provided in the request
    const dbUsers = await User.findAll({
      where: {
        id: {
          [Op.in]: users, // Corrected usage of Op.in
        },
      },
    });

    // Associate found users with the project
    await project.addUsers(dbUsers);

    // Retrieve the newly created project with associated users
    const newProject = await Project.findByPk(project.id, {
      include: [{ model: User }], // Corrected include syntax
    });

    return res.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).send("Server Error");
  }
});

// Delete Project
router.delete("/:projectId", requireOwnerAuth, async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.json({ message: "Project not found" });
  }
  await project.destroy();
  return res.json({ message: "Project deleted" });
});

// Update Project
router.put("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;

  const project = await Project.findByPk(projectId, {
    include: User,
    required: false,
  });
  if (!project) {
    return res.json({ message: "Project not found" });
  }
  if (!project.Users.find((user) => user.id === req.user.id)) {
    return res.json({ message: "Unauthorized" });
  }
  project.name = name;
  await project.save();
  return res.json(project);
});

// USERS SECTION

// Get all users for a project
router.get("/:projectId/users", async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByPk(projectId, {
    include: User,
  });
  res.json(project.Users);
});

// Add user to project BY USER ID
router.post("/:projectId/users", requireOwnerAuth, async (req, res) => {
  const { projectId } = req.params;
  const { users } = req.body; // Assuming 'users' is an array of userIds

  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  const dbUsers = await User.findAll({
    where: {
      id: {
        [Op.in]: users, // Corrected usage of Op.in
      },
    },
  });
  await project.addUsers(dbUsers);

  return res.json({ message: "Users added to project" }); // Changed message to plural since multiple users can be added
});

// Remove users from project
router.delete("/:projectId/users", requireOwnerAuth, async (req, res) => {
  const { projectId } = req.params;
  const { users } = req.body; // Assuming 'users' is an array of userIds

  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.json({ message: "Project not found" });
  }
  const dbUsers = await User.findAll({
    where: {
      id: {
        [Op.in]: users, // Corrected usage of Op.in
      },
    },
  });
  if (!users.length) {
    return res.json({ message: "Users not found" });
  }

  await project.removeUsers(dbUsers);
  return res.json({ message: "User removed from project" });
});

module.exports = router;
