const express = require("express");
const router = express.Router();
const Student = require("../models/Student.js");
const { validate } = require("../middleware/validate.middleware.js");
const {
  idParamSchema,
  createStudentSchema,
  updateStudentSchema,
  studentNameSchema
} = require("../validations/student.validation.js");

// CRUD ops for /students

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post("/",
  validate(createStudentSchema),
  async (req, res) => {
    try {
      const student = await Student.create(req.validatedData);
      res.json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.put('/:name',
  validate(studentNameSchema, source = 'params'),
  validate(updateStudentSchema),
  async (req, res) => {
    try {
      const name = req.validatedData.name;
      const student = await Student.findOne({"name": name});
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      if (req.validatedData.course) student.course = req.validatedData.course;
      if (req.validatedData.age) student.age = req.validatedData.age;
      await student.save();
  
      return res.status(200).json({ message: "Student updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

router.delete('/:name',
  validate(studentNameSchema, source = "params"),
  async (req, res) => {
  try {
    const name = req.validatedData.name;
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
