const mongoose = require("mongoose");
const Joi = require("joi");

// create Schema Object data
const Schema = new mongoose.Schema({
  title: String,
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "taskSection",
  },
});
// create Modal or Document / tabel / collection
const Tasks = mongoose.model("tasks", Schema);

const validationTasks = (body) => {
  const validateSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    sectionId: Joi.string().min(1).max(255).required(),
  });

  return validateSchema.validate(body);
};

module.exports = {
  Tasks,
  validationTasks,
};
