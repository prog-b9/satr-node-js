const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const Schema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

// Create a pre-save middleware to hash the password
Schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

const Users = mongoose.model("users", Schema);

const validaitionCreateUser = (body) => {
  const validateSchema = Joi.object({
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return validateSchema.validate(body);
};

module.exports = {
  Users,
  validaitionCreateUser,
};
