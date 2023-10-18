const {
  TaskSection,
  validationTaskSection,
} = require("../models/TaskSectionModel");

// GET S
const getTaskSections = async (req, res) => {
  try {
    const getTaskSections = await TaskSection.find();

    res.json({
      data: getTaskSections,
      count: getTaskSections.length,
    });
  } catch (error) {
    res.json({ message: error });
  }
};
// POST
const createTaskSection = async (req, res) => {
  try {
    const { error } = validationTaskSection(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const newTaskSection = new TaskSection({
      sectionName: req.body.sectionName,
    });

    await newTaskSection.save();

    res.json({
      message: "create new sectionName sccessfuly",
      data: newTaskSection,
    });
  } catch (error) {
    res.json({ message: error });
  }
};
// DELETE S
const deleteTaskSections = async (req, res) => {
  try {
    const deleteTaskSections = await TaskSection.deleteMany();
    if (deleteTaskSections.deletedCount == 0) {
      return res
        .status(404)
        .json({ message: "taskSections (S) is not founds" });
    }

    res.json({ message: "delete taskSections successfuly" });
  } catch (error) {
    res.json({ message: error });
  }
};
module.exports = {
  getTaskSections,
  createTaskSection,
  deleteTaskSections,
};
