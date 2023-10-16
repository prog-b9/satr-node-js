const Tasks = require("../models/TasksModel");

/// GET todos ///////
const getTasks = async (req, res) => {
  try {
    const getTasks = await Tasks.find();

    if (getTasks.length == 0) {
      return res.status(404).json({ message: "Tasks (s) is not founds" });
    }

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
/// GET todo One ///////
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
/// POST todos ///////
const createTask = async (req, res) => {
  try {
    // if the title is Empty
    if (!req.body.title) {
      return res.status(400).json({ message: "Task Is Required" });
    }
    const newTask = new Tasks({
      title: req.body.title,
    });
    await newTask.save();

    res.json({
      message: "New Task Successfuly",
      date: newTask,
    });
  } catch (error) {
    res.json({
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
};
