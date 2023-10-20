const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/TasksController");

/// GET todos ///////
router.get("/", TasksController.getTasks);
/// GET todo One ///////
router.get("/:id", TasksController.getTask);
/// GET Tasks By section id ///////
router.get(
  "/taskSection/:uid/:sid",
  TasksController.getTaskBySectionIdAndByUserId
);
/// GET Tasks By section id and userId Is compalted to false ///////
router.get(
  "/taskSection/complatedToFalse/:uid/:sid",
  TasksController.getTaskBySectionIdAndByUserIdIsCompaltedFalse
); /// GET Tasks By section id and userId Is compalted to true ///////
router.get(
  "/taskSection/complatedToTrue/:uid/:sid",
  TasksController.getTaskBySectionIdAndByUserIdIsCompaltedTrue
);
/// POST todos ///////
router.post("/", TasksController.createTask);
/// PUT todo ///////
router.put("/:id", TasksController.editTask);
/// PUT edit compalted to false ///////
router.put("/complatedToFalse/:id", TasksController.editComplatedToFalse);
/// PUT edit compalted to true ///////
router.put("/complatedToTrue/:id", TasksController.editComplatedToTrue);
/// DELETE todo one ///////
router.delete("/:id", TasksController.deleteTask);
/// DELETE All todo ///////
router.delete("/", TasksController.deleteTasks);

module.exports = router;
