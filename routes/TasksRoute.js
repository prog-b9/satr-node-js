const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/TasksController");

/// GET todos ///////
router.get("/", TasksController.getTasks);
/// GET todo One ///////
router.get("/:id", TasksController.getTask);
/// GET Tasks By section id ///////
router.get("/taskSection/:id", TasksController.getTaskBySectionId);
/// POST todos ///////
router.post("/", TasksController.createTask);

/// PUT todo ///////
router.put("/:id", TasksController.editTask);
/// DELETE todo one ///////
router.delete("/:id", TasksController.deleteTask);
/// DELETE All todo ///////
router.delete("/", TasksController.deleteTasks);

module.exports = router;
