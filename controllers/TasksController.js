const {
  Tasks,
  validationTasks,
  validationEditTasks,
} = require("../models/TasksModel");
const { TaskSection } = require("../models/TaskSectionModel");
const { Users } = require("../models/UserModel");

/// GET tasks ///////
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
// GET tasks by sectionId and userId
const getTaskBySectionIdAndByUserId = async (req, res) => {
  try {
    const findUser = await Users.findOne({ _id: req.params.uid });

    if (!findUser) {
      return res.json({ message: "user id is not found" });
    }

    const getSectionNameBySectionId = await TaskSection.findOne({
      _id: req.params.sid,
    });

    if (!getSectionNameBySectionId) {
      return res
        .status(404)
        .json({ message: "Tasks By section id (s) is not founds" });
    }
    const getTaskBySectionId = await Tasks.find({
      sectionId: req.params.sid,
      userId: req.params.uid,
    });

    // get count complated true
    const getTaskBySectionIdComplatedTrue = await Tasks.find({
      sectionId: req.params.sid,
      userId: req.params.uid,
      isComplated: true,
    });
    // get count complated false
    const getTaskBySectionIdComplatedFalse = await Tasks.find({
      sectionId: req.params.sid,
      userId: req.params.uid,
      isComplated: false,
    });
    const percent =
      (getTaskBySectionIdComplatedTrue.length * 100) /
      getTaskBySectionId.length;
    res.json({
      sectionName: getSectionNameBySectionId.sectionName,
      data: getTaskBySectionId,
      countComplatedTrue: getTaskBySectionIdComplatedTrue.length,
      countComplatedFalse: getTaskBySectionIdComplatedFalse.length,
      percent: percent,
      count: getTaskBySectionId.length,
    });
  } catch (error) {
    res.json({
      message: "Tasks By section id (s) is not founds",
      error: error,
    });
  }
};
// GET tasks by sectionId and userId compalted to False
const getTaskBySectionIdAndByUserIdIsCompaltedFalse = async (req, res) => {
  try {
    const findUser = await Users.findOne({ _id: req.params.uid });

    if (!findUser) {
      return res.json({ message: "user id is not found" });
    }

    const getSectionNameBySectionId = await TaskSection.findOne({
      _id: req.params.sid,
    });

    if (!getSectionNameBySectionId) {
      return res
        .status(404)
        .json({ message: "Tasks By section id (s) is not founds" });
    }

    // get count complated false
    const getTaskBySectionIdComplatedFalse = await Tasks.find({
      sectionId: req.params.sid,
      userId: req.params.uid,
      isComplated: false,
    });
    res.json({
      // sectionName: getSectionNameBySectionId.sectionName,
      data: getTaskBySectionIdComplatedFalse,
      count: getTaskBySectionIdComplatedFalse.length,
    });
  } catch (error) {
    res.json({
      message: "Tasks By section id (s) is not founds",
      error: error,
    });
  }
};
// GET tasks by sectionId and userId compalted to True
const getTaskBySectionIdAndByUserIdIsCompaltedTrue = async (req, res) => {
  try {
    const findUser = await Users.findOne({ _id: req.params.uid });

    if (!findUser) {
      return res.json({ message: "user id is not found" });
    }

    const getSectionNameBySectionId = await TaskSection.findOne({
      _id: req.params.sid,
    });

    if (!getSectionNameBySectionId) {
      return res
        .status(404)
        .json({ message: "Tasks By section id (s) is not founds" });
    }

    // get count complated true
    const getTaskBySectionIdComplatedTrue = await Tasks.find({
      sectionId: req.params.sid,
      userId: req.params.uid,
      isComplated: true,
    });

    res.json({
      data: getTaskBySectionIdComplatedTrue,
      count: getTaskBySectionIdComplatedTrue.length,
    });
  } catch (error) {
    res.json({
      message: "Tasks By section id (s) is not founds",
      error: error,
    });
  }
};
/// POST task ///////
const createTask = async (req, res) => {
  try {
    const { error } = validationTasks(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const findUser = await Users.findOne({ _id: req.body.userId });

    if (!findUser) {
      return res.json({ message: "user id is not found" });
    }

    const findSectionId = await TaskSection.findOne({
      _id: req.body.sectionId,
    });
    if (!findSectionId) {
      return res.status(404).json({ message: "section id is not found" });
    }

    const newTask = new Tasks({
      sectionId: req.body.sectionId,
      userId: req.body.userId,
      title: req.body.title,
      subTitle: req.body.subTitle,
      isComplated: false,
      date: new Date(),
    });
    await newTask.save();

    res.json({
      message: "New Task Successfuly",
      date: newTask,
    });
  } catch (error) {
    res.json({
      message: "some id is not found",
      error: error,
    });
  }
};
/// PUT edit task ///////
const editTask = async (req, res) => {
  try {
    // find task id
    const getTaskById = await Tasks.findOne({ _id: req.params.id });
    if (!getTaskById) {
      return res.json({ message: "task id is not found" });
    }

    const editTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
      },
      { new: true }
    );
    res.json({
      message: "update task seccessufly",
      data: editTask,
    });
  } catch (error) {
    res.json({ message: "task id is not found", error: error });
  }
};
/// PUT edit compalted to True ///////
const editComplatedToTrue = async (req, res) => {
  try {
    const findTaskId = await Tasks.findOne({ _id: req.params.id });

    if (!findTaskId) {
      return res.status(404).json({ message: "task id is not found" });
    }

    // edit compalted to true
    const editComplatedToTrue = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        isComplated: true,
      },
      { new: true }
    );

    res.json({
      message: "update complated to true successfuly",
      data: editComplatedToTrue,
    });
  } catch (error) {
    res.json({ message: "task id is not found", error: error });
  }
};
/// PUT edit compalted to False ///////
const editComplatedToFalse = async (req, res) => {
  try {
    const findTaskId = await Tasks.findOne({ _id: req.params.id });

    if (!findTaskId) {
      return res.status(404).json({ message: "task id is not found" });
    }

    // edit compalted to False
    const editComplatedToFalse = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        isComplated: false,
      },
      { new: true }
    );

    res.json({
      message: "update complated to false successfuly",
      data: editComplatedToFalse,
    });
  } catch (error) {
    res.json({ message: "task id is not found", error: error });
  }
};
/// DELETE task one ///////
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
/// DELETE All tasks ///////
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
  getTaskBySectionIdAndByUserId,
  getTaskBySectionIdAndByUserIdIsCompaltedFalse,
  getTaskBySectionIdAndByUserIdIsCompaltedTrue,
  editComplatedToTrue,
  editComplatedToFalse,
};
