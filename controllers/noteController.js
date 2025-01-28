const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    return res.status(200).json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createNote = async (req, res) => {
  const { content } = req.body;
  try {
    const newNote = new Note({ content, user: req.user.id });
    await newNote.save();
    res.status(201).send("Note created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateNote = async (req, res) => {
  const { content } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    res.status(200).send("Note updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).send("Note deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
