const router = require("express").Router();
const { Project, User } = require("../../db/models");
const { requireOwnerAuth } = require("../../utils/auth");

// Get all projects TESTING ONLY
router.get("/", async (req, res) => {
  const projects = await Project.findAll({
    include: User,
    required: false,
  });
  res.json(projects);
});

// Create Project
router.post("/", requireOwnerAuth, async (req, res) => {
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
// Add user to project
router.post("/:projectId/users/:userId", requireOwnerAuth, async (req, res) => {
  const { projectId, userId } = req.params;

  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.json({ message: "Project not found" });
  }
  const user = await User.findByPk(userId);
  if (!user) {
    return res.json({ message: "User not found" });
  }
  await project.addUser(user);
  return res.json({ message: "User added to project" });
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
