const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");


// ================= CREATE =================
router.post("/", auth, async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send("Error creating student");
  }
});


// ================= GET SINGLE (IMPORTANT FIRST) =================
router.get("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.send(student);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


// ================= GET ALL =================
router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    res.status(500).send("Error fetching students");
  }
});


// ================= UPDATE =================
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // 🔥 important (returns updated data)
    );

    res.send(updated);
  } catch (err) {
    res.status(500).send("Error updating student");
  }
});


// ================= DELETE =================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send("Error deleting student");
  }
});


module.exports = router;