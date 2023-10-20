const {
  TaskSection,
  validationTaskSection,
  validationEditTaskSection,
} = require("../models/TaskSectionModel");
const { Users } = require("../models/UserModel");

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
// GET By User ID
const getTaskSectionsByUserId = async (req, res) => {
  try {
    const findUser = await Users.findOne({ _id: req.params.id });

    if (!findUser) {
      return res.json({ message: "user id is not found" });
    }

    const getTaskSectionsByUserId = await TaskSection.find({
      userId: req.params.id,
    });
    res.json({
      userInfo: findUser,
      data: getTaskSectionsByUserId,
      count: getTaskSectionsByUserId.length,
    });
  } catch (error) {
    res.json({
      message: "user id is not found",
      error: error,
    });
  }
};
// POST (STOP the Api) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
// POST By User ID
const createTaskSectionByUserId = async (req, res) => {
  try {
    const { error } = validationTaskSection(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const findUser = await Users.findOne({ _id: req.body.userId });

    if (!findUser) {
      return res.json({ message: "user id is not found" });
    }

    const newTaskSectionByUserId = new TaskSection({
      sectionName: req.body.sectionName,
      userId: req.body.userId,
    });

    await newTaskSectionByUserId.save();

    res.json({
      message: "create new sectionName by user id sccessfuly",
      data: newTaskSectionByUserId,
    });
  } catch (error) {
    res.json({
      message: "user id is not found",
      error: error,
    });
  }
};
// PUT By User ID
const editTaskSectionByUserId = async (req, res) => {
  try {
    const { error } = validationEditTaskSection(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const findUserId = await Users.findById(req.params.uid);
    if (!findUserId) {
      return res.status(404).json({ message: "user id is not found" });
    }

    const findtaskSectionId = await TaskSection.findById(req.params.sid);
    if (!findtaskSectionId) {
      return res.status(404).json({ message: "task section id is not found" });
    }

    const editTaskSectionByUserId = await TaskSection.findByIdAndUpdate(
      req.params.sid,
      { sectionName: req.body.sectionName },
      { new: true }
    );

    res.json({
      message: "update section successfuly",
      data: editTaskSectionByUserId,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
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
  getTaskSectionsByUserId,
  createTaskSection,
  deleteTaskSections,
  createTaskSectionByUserId,
  editTaskSectionByUserId,
};
