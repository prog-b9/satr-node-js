const Students = require("../models/StudentModel");

const getStudents = async (req, res) => {
  try {
    const students = await Students.find();

    if (students.length == 0) {
      return res.status(404).json({ message: "Students (s) is not founds" });
    }
    res.json({
      date: students,
      count: students.length,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getStudent = async (req, res) => {
  try {
    const stundetById = await Students.findById({ _id: req.params.id });
    if (!stundetById) {
      return res.status(404).json({ message: "student is not found" });
    }

    res.json(stundetById);
  } catch (error) {
    res.json({
      message: "student is not found",
      error: error,
    });
  }
};
const createStudent = async (req, res) => {
  try {
    if (!req.body.name && !req.body.age) {
      return res.status(404).json({ message: "feilds all is required" });
    }
    if (!req.body.name) {
      return res.status(404).json({ message: "name is required" });
    }
    if (!req.body.age) {
      return res.status(404).json({ message: "age is required" });
    }
    const newStudent = new Students({
      name: req.body.name,
      age: req.body.age,
    });

    await newStudent.save();

    res.json({
      message: "insert new student Successfuly",
      data: newStudent,
    });
  } catch (error) {
    res.json({
      message: "student is not found",
      error: error,
    });
  }
};
const editStudent = async (req, res) => {
  try {
    const stundetById = await Students.findById({ _id: req.params.id });
    if (!stundetById) {
      return res.status(404).json({ message: "student is not found" });
    }

    // if (!req.body.name) {
    //   return res.status(404).json({ message: "name is required" });
    // }
    const editStudent = await Students.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, age: req.body.age },
      { new: true }
    );

    res.json({
      message: "edit student Successfuly",
      data: editStudent,
    });
  } catch (error) {
    res.json({
      message: "student is not found",
      error: error,
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const stundetById = await Students.findById({ _id: req.params.id });
    if (!stundetById) {
      return res.status(404).json({ message: "student is not found" });
    }
    const deleteStudent = await Students.deleteOne({ _id: req.params.id });

    res.json({
      message: "delete student Successfuly",
      data: deleteStudent,
    });
  } catch (error) {
    res.json({
      message: "student is not found",
      error: error,
    });
  }
};
const deleteStudents = async (req, res) => {
  try {
    const deleteStudents = await Students.deleteMany();
    if (deleteStudents.deletedCount == 0) {
      return res.status(404).json({ message: "Students (s) is not founds" });
    }
    res.json({
      message: "delete students (s) Successfuly",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
module.exports = {
  getStudents,
  getStudent,
  createStudent,
  editStudent,
  deleteStudent,
  deleteStudents,
};
