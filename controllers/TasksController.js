const { Tasks, validationTasks } = require("../models/TasksModel");
const { TaskSection } = require("../models/TaskSectionModel");

/// GET todos ///////
const getTasks = async (req, res) => {
  try {
    const getTasks = await Tasks.find();

    res.json({
      data: getTasks,
      count: getTasks.length,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
/// GET Tasks By section id ///////
const getTask = async (req, res) => {
  try {
    const getTaskById = await Tasks.findById({ _id: req.params.id });

    if (!getTaskById) {
      return res.status(404).json({
        message: "task id is not found",
      });
    }

    res.json(getTaskById);
  } catch (error) {
    res.json({
      message: "task id is not found",
      error: error,
    });
  }
};
// GET S
const getTaskBySectionId = async (req, res) => {
  try {
    const getTaskBySectionId = await Tasks.find({
      sectionId: req.params.id,
    });

    const getSectionNameBySectionId = await TaskSection.findOne({
      _id: req.params.id,
    });

    if (!getSectionNameBySectionId) {
      return res
        .status(404)
        .json({ message: "Tasks By section id (s) is not founds" });
    }

    res.json({
      sectionName: getSectionNameBySectionId.sectionName,
      data: getTaskBySectionId,
      count: getTaskBySectionId.length,
    });
  } catch (error) {
    res.json({
      message: "Tasks By section id (s) is not founds",
      error: error,
    });
  }
};
/// POST todos ///////
const createTask = async (req, res) => {
  try {
    const { error } = validationTasks(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const findSectionId = await TaskSection.findOne({
      _id: req.body.sectionId,
    });
    if (!findSectionId) {
      return res.status(404).json({ message: "section id is not found" });
    }

    // if the title is Empty
    // if (!req.body.title) {
    //   return res.status(400).json({ message: "Task Is Required" });
    // }

    const newTask = new Tasks({
      title: req.body.title,
      sectionId: req.body.sectionId,
    });
    await newTask.save();

    res.json({
      message: "New Task Successfuly",
      date: newTask,
    });
  } catch (error) {
    res.json({
      message: "section id is not found",
      error: error,
    });
  }
};
/// PUT todo ///////
const editTask = async (req, res) => {
  try {
    const getTaskById = await Tasks.findById({ _id: req.params.id });
    if (!getTaskById) {
      return res.status(400).json({ message: "task id is not found" });
    }

    if (!req.body.title) {
      return res.status(400).json({ message: "Task Is Required" });
    }

    const editTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
      },
      { new: true }
    );
    res.json({
      message: "update task Seccessufly",
      data: editTask,
    });
  } catch (error) {
    res.json({ message: "task id is not found", error: error });
  }
};
/// DELETE todo one ///////
const deleteTask = async (req, res) => {
  try {
    const getTaskById = await Tasks.findById({ _id: req.params.id });

    if (!getTaskById) {
      return res.status(400).json({ message: "task id is not found" });
    }

    const deleteTask = await Tasks.deleteOne({ _id: req.params.id });

    res.json({
      message: "delete task Successfuly",
      data: deleteTask,
    });
  } catch (error) {
    res.json({
      message: "task id is not found",
      data: error,
    });
  }
};
/// DELETE All todo ///////
const deleteTasks = async (req, res) => {
  try {
    const deleteTasks = await Tasks.deleteMany();
    if (deleteTasks.deletedCount == 0) {
      return res.json({
        message: "Tasks (s) is not founds",
      });
    }
    res.json({
      message: "delete all Tasks Successfuly",
      data: deleteTasks,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getTask,
  getTasks,
  createTask,
  editTask,
  deleteTask,
  deleteTasks,
  getTaskBySectionId,
};
