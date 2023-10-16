const router = require("express").Router();
const StudentController = require("../controllers/StudentController");
router.get("/", StudentController.getStudents);
router.get("/:id", StudentController.getStudent);
router.post("/", StudentController.createStudent);
router.put("/:id", StudentController.editStudent);
router.delete("/:id", StudentController.deleteStudent);
router.delete("/", StudentController.deleteStudents);

module.exports = router;
