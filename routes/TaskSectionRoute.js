const router = require("express").Router();
const TaskSectionController = require("../controllers/TaskSectionController");

router.get("/", TaskSectionController.getTaskSections);
router.get("/userId/:id", TaskSectionController.getTaskSectionsByUserId);
router.post("/", TaskSectionController.createTaskSection);
router.post("/userId", TaskSectionController.createTaskSectionByUserId);
router.put("/userId/:uid/:sid", TaskSectionController.editTaskSectionByUserId);
router.delete("/", TaskSectionController.deleteTaskSections);

module.exports = router;
