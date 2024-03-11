const router = require("express").Router();
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
  const { name } = req.body;
  const project = await Project.create({ name });
  const owner = await User.findOne({
    where: { role: "owner" },
  });
  project.addUser(owner);
  return res.json(project);
});

// Delete Project
router.delete("/:projectId", requireOwnerAuth, async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByPk(projectId);
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

  for (let i = 0; i < users.length; i++) {
    const userId = users[i]; // Corrected line to define userId
    const user = await User.findByPk(userId);
    if (user) {
      await project.addUser(user);
    }
  }

  return res.json({ message: "Users added to project" }); // Changed message to plural since multiple users can be added
});


// Remove user from project
router.delete(
  "/:projectId/users/:userId",
  requireOwnerAuth,
  async (req, res) => {
    const { projectId, userId } = req.params;

    const project = await Project.findByPk(projectId);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    if (!project) {
      return res.json({ message: "Project not found" });
    }
    if (user.role === "owner") {
      return res.json({ message: "Cannot remove owner from project" });
    }

    await project.removeUser(user);
    return res.json({ message: "User removed from project" });
  }
);

module.exports = router;
