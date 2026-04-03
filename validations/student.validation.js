const { z } = require('zod');

// Base
const name = z.string().min(2);
const course = z.string().min(2);
const age = z.coerce.number().int().min(1).max(120);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const createStudentSchema = z.object({
  name,
  course,
  age
});

const updateStudentSchema = z.object({
  name: name.optional(),
  course: course.optional(),
  age: age.optional()
});

const studentNameSchema = z.object({
  name
});

module.exports = {
  idParamSchema,
  createStudentSchema,
  updateStudentSchema,
  studentNameSchema
}

