const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const auth = require("../middleware/auth");

router.get("/", auth, getNotes);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

module.exports = router;

router.get("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }
    return res.status(200).json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
