const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    require: true
  },
  course: {
    type: String,
    default: "CSE"
  },
}, {timestamps: true});

module.exports = mongoose.model("Student", studentSchema);

