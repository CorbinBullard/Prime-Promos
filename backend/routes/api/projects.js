const router = require("express").Router();
const { Op } = require("sequelize");
const {
  Project,
  User,
  Item,
  Note,
  ArchivedProject,
} = require("../../db/models");
const {
  requireOwnerAuth,
  requireAuth,
  requireAdminAuth,
  validateProjectUser,
  canUpdateProject,
} = require("../../utils/auth");
const { validateProject } = require("../../utils/modelValidators");

// Get all projects
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;
  const UserJSON = user.toJSON();
  const { id, role } = UserJSON;

  try {
    let projects;
    if (role === "owner" || role === "admin") {
      // For 'owner' or 'admin', fetch all projects
      projects = await Project.findAll({
        include: [
          { model: User, required: false }, // Assuming User-Project is a many-to-many relationship
          { model: Item, required: false },
        ],
      });
    } else {
      // For other roles, only fetch projects associated with the user
      projects = await Project.findAll({
        where: {
          status: "active", // Filter to include only active projects
        },
        include: [
          {
            model: User,
            where: { id }, // Filter to include only projects of this user
            required: true,
          },
          { model: Item, required: false },
        ],
      });
    }

    return res.json(projects);
  } catch (error) {
    console.error("Failed to get projects", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Get archived projects
router.get("/archived", requireAdminAuth, async (req, res) => {
  const projects = await ArchivedProject.findAll();
  res.json(projects);
});

// Create Project
router.post("/", requireOwnerAuth, validateProject, async (req, res) => {
  const { name, users, inHandsDate, eventDate, customerPO, salesConfirmation } =
    req.body;

  try {
    // Create the project without including users in this step
    const project = await Project.create({
      name,
      inHandsDate,
      eventDate,
      customerPO,
      salesConfirmation,
    });

    if (users && users.length) {
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
    }

    // Retrieve the newly created project with associated users
    const newProject = await Project.findByPk(project.id, {
      include: [{ model: User, required: false }], // Corrected include syntax
    });

    return res.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).send("Server Error");
  }
});

// Get Project by ID
router.get("/:projectId", requireAuth, async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByPk(projectId, {
    include: User,
    required: false,
  });
  if (!project) {
    return res.json({ message: "Project not found" });
  }
  return res.json(project);
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
router.put("/:projectId", canUpdateProject, async (req, res) => {
  const { role } = req.user;
  const { projectId } = req.params;
  const { name, inHandsDate, eventDate, customerPO, salesConfirmation } =
    req.body;

  const project = await Project.findByPk(projectId, {
    include: User,
    required: false,
  });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (
    role !== "owner" &&
    !project.Users.find((user) => user.id === req.user.id)
  ) {
    return res.status(405).json({ message: "Unauthorized" });
  }

  const updatedProject = await project.update({
    name,
    inHandsDate,
    eventDate,
    customerPO,
    salesConfirmation,
  });
  return res.json(updatedProject);
});

// Update Project Status completed
router.patch(
  "/:projectId/status-completed",
  requireAdminAuth,
  async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.json({ message: "Project not found" });
    }
    const isComplete = await project.isComplete();
    if (!isComplete) {
      return res.json({ message: "Project is not complete" });
    }
    await project.update({ status: "completed" });
    return res.json({ message: "Project status updated" });
  }
);

// Update Project Status archived
router.patch(
  "/:projectId/status-archived",
  requireAdminAuth,
  async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findByPk(projectId, {
      include: { model: Item, required: false },
    });
    if (!project) {
      return res.json({ message: "Project not found" });
    }
    if (project.status !== "completed") {
      return res.json({
        message: "Project must be completed before archiving",
      });
    }
    await project.archive();

    return res.json({ message: "Project status updated" });
  }
);

// Delete multiple archived projects
router.delete("/archived/bulk", requireAdminAuth, async (req, res) => {
  const { projectIds } = req.body;
  const projects = await ArchivedProject.findAll({
    where: {
      id: {
        [Op.in]: projectIds, // Corrected usage of Op.in
      },
    },
  });
  if (!projects.length) {
    return res.json({ message: "Projects not found" });
  }
  await ArchivedProject.destroy({
    where: {
      id: {
        [Op.in]: projectIds, // Corrected usage of Op.in
      },
    },
  });
  return res.json({ message: "Projects deleted" });
});
// Delete archived project
router.delete("/:projectId/archived", requireAdminAuth, async (req, res) => {
  const { projectId } = req.params;
  const project = await ArchivedProject.findByPk(projectId);
  if (!project) {
    return res.json({ message: "Project not found" });
  }
  await project.destroy();
  return res.json({ message: "Project deleted" });
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

// Add SINGLE user to project BY USER ID
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

// Add MULTIPLE users to project BY USER ID
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

// Remove SINGLE user from project
router.delete(
  "/:projectId/users/:userId",
  requireOwnerAuth,
  async (req, res) => {
    const { projectId, userId } = req.params;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.json({ message: "Project not found" });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    await project.removeUser(user);
    return res.json({ message: "User removed from project" });
  }
);

// Remove MULTIPLE users from project
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

// Items

// Get all items for a project
router.get(
  "/:projectId/items",
  requireAuth,
  // validateProjectUser,
  async (req, res) => {
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

    const items = await project.getItems({
      include: Note,
      required: false,
    });

    const formattedItems = items.map((item) => {
      const itemJSON = item.toJSON();
      return {
        ...itemJSON,
        currentPercentage: item.getCurrentStatusPercentage(itemJSON),
      };
    });
    res.json(formattedItems);
  }
);

// Add item to project
router.post("/:projectId/items", requireAdminAuth, async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;

  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (project.status !== "active") {
    return res.status(405).json({ message: "Project is not active" });
  }
  const item = await project.createItem({ name, projectId: project.id });
  res.json(item);
});

module.exports = router;
