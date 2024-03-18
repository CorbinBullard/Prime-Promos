const router = require("express").Router();
const { Op } = require("sequelize");
const { Project, User, Item } = require("../../db/models");
const { requireOwnerAuth, requireAuth, requireAdminAuth, validateProjectUser } = require("../../utils/auth");

// Get all items TESTING ONLY
router.get("/", requireAuth, async (req, res) => {
  const items = await Item.findAll();
  return res.json(items);
});

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
  const { logo }= req.body;
  // check if user is apart of the current project
  const item = await Item.findByPk(id);
  console.log("\nITEM", item, id,"\n");
  if (!item) {
    return res.status(404).send("Item not found");
  }
  await item.update({ ...req.body });
  return res.json(item);
});

module.exports = router;
