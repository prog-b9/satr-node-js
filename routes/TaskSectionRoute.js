const router = require("express").Router();
const TaskSectionController = require("../controllers/TaskSectionController");

router.get("/", TaskSectionController.getTaskSections);
router.post("/", TaskSectionController.createTaskSection);
router.delete("/", TaskSectionController.deleteTaskSections);

module.exports = router;
