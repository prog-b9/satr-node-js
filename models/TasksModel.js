const mongoose = require("mongoose");
const Joi = require("joi");

// create Schema Object data
const Schema = new mongoose.Schema({
  title: String,
  subTitle: String,
  isComplated: Boolean,
  date: Date,
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "taskSection",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
// create Modal or Document / tabel / collection
const Tasks = mongoose.model("tasks", Schema);

const validationTasks = (body) => {
  const validateSchema = Joi.object({
    sectionId: Joi.string().min(1).max(255).required(),
    userId: Joi.string().min(1).max(255).required(),
    title: Joi.string().min(1).max(255).required(),
    subTitle: Joi.string().min(1).max(255),
    isComplated: Joi.boolean(),
    date: Joi.string(),
  });

  return validateSchema.validate(body);
};

const validationEditTasks = (body) => {
  const validateSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
  });

  return validateSchema.validate(body);
};

module.exports = {
  Tasks,
  validationTasks,
  validationEditTasks,
};
