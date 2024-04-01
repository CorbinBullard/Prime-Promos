const router = require("express").Router();
const { Item, Note } = require("../../db/models");
const { requireAdminAuth } = require("../../utils/auth");

// Get all notes
router.get("/", async (req, res) => {
  const notes = await Note.findAll();
  return res.json(notes);
});

// Update note by id
router.put("/:id", requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const note = await Note.findByPk(id);
  if (!note) {
    return res.status(404).send("Note not found");
  }

  const newNote = await note.update({ ...req.body });

  return res.json(newNote);
});

// Delete note by id
router.delete("/:id", requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByPk(id);
  if (!note) {
    return res.status(404).send("Note not found");
  }
  await note.destroy();
  return res.json(note);
});

module.exports = router;
