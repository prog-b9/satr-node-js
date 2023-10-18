const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = new mongoose.Schema({
  sectionName: { type: String, required: true },
});

const TaskSection = mongoose.model("taskSection", Schema);

const validationTaskSection = (body) => {
  const validateSchema = Joi.object({
    sectionName: Joi.string().min(1).max(255).required(),
  });

  return validateSchema.validate(body);
};

module.exports = {
  TaskSection,
  validationTaskSection,
};
