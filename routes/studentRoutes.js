const express = require("express");
const router = express.Router();
const Student = require("../models/Student.js");

// CRUD ops for /students

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const student = await Student.findOne({"name": name});
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.course = req.body.course;
    await student.save();

    return res.status(200).json({ message: "Student updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const result = await Student.deleteOne({"name": name});

    if (result.deletedCount == 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router };
