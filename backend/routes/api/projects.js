const router = require("express").Router();
const { Op } = require("sequelize");
const { Project, User, Item } = require("../../db/models");
const {
  requireOwnerAuth,
  requireAuth,
  requireAdminAuth,
  validateProjectUser,
} = require("../../utils/auth");

// Get all projects
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;
  const UserJSON = user.toJSON();
  const { id, role } = UserJSON;
  console.log("USER", user.toJSON());
  console.log("ID", id);
  const where = {};
  if (role !== "owner" && role !== "admin") {
    where.id = id;
  }

  const projects = await Project.findAll({
    where,
    include: [
      { model: User, required: false },
      { model: Item, required: false },
    ],
    required: false,
  });

  return res.json(projects);
});

// Create Project
router.post("/", requireOwnerAuth, async (req, res) => {
  console.log("REQ BODY", req.body);
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
  const { name, inHandsDate, eventDate, customerPO, salesConfirmation } =
    req.body;

    console.log("REQ BODY", req.body)

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
  const updatedProject = await project.update({
    name,
    inHandsDate,
    eventDate,
    customerPO,
    salesConfirmation,
  });
  return res.json(updatedProject);
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

    const items = await project.getItems();

    const formattedItems = items.map((item) => {
      const itemJSON = item.toJSON();
      return {
        ...itemJSON,
        currentPercentage: item.getCurrentStatusPercentage(itemJSON),
      };
    });
    console.log("FORMATTED ITEMS", formattedItems);
    res.json(formattedItems);
  }
);

// Add item to project
router.post("/:projectId/items", requireAdminAuth, async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;

  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.json({ message: "Project not found" });
  }
  const item = await project.createItem({ name, projectId: project.id });
  res.json(item);
});

module.exports = router;
