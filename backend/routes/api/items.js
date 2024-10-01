const router = require("express").Router();
const { Op } = require("sequelize");
const { Project, User, Item } = require("../../db/models");
const {
  requireOwnerAuth,
  requireAuth,
  requireAdminAuth,
  validateProjectUser,
} = require("../../utils/auth");



// delete item by id
router.delete("/:id", requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).send("Item not found");
  }
  await item.destroy();
  return res.json(item);
});

// update item by id
// This may need to be seperated into different logic for different fields
router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  // check if user is apart of the current project
  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const newItem = await item.update({ ...req.body });

  return res.json(newItem);
});


router.post("/:id/image", requireAuth, async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).send("Item not found");
  }

  return res.json(item);
});

// Notes
router.get("/:id/notes", requireAuth, async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).send("Item not found");
  }

  const notes = await item.getNotes();
  return res.json(notes);
});

router.post("/:id/notes", requireAuth, async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).send("Item not found");
  }

  const note = await item.createNote({
    ...req.body,
    userId: req.user.id,
  });

  return res.json(note);
});

module.exports = router;
