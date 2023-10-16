const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Students = mongoose.model("student", Schema);

module.exports = Students;
