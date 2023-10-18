const { reset } = require("nodemon");
const { Users, validaitionCreateUser } = require("../models/UserModel");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();

    if (users.length == 0) {
      return res.status(404).json({ message: "users (S) is not founds" });
    }
    res.json({
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const profileUser = async (req, res) => {
  try {
    const profile = await Users.findById(req.user._id);
    if (!profile) {
      return res.status(404).json({
        message: "user id is not found",
      });
    }
    res.send(profile);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { error } = validaitionCreateUser(req.body);

    if (error) {
      return res.json({ message: error.details[0].message });
    }
    // check from FORM body inputs
    // if (!req.body.email || !req.body.password) {
    //   return res
    //     .status(400)
    //     .json({ message: "email and password are required" });
    // }

    const findUser = await Users.findOne({ email: req.body.email });

    if (findUser) {
      return res.status(404).json({ message: "user already registered" });
    }

    const newUser = new Users({
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();

    res.json({
      message: "create new user Successfuly",
      data: newUser,
    });
  } catch (error) {
    res.json({
      message: "user id is not found",
      error: error,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { error } = validaitionCreateUser(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const findAdmin = await Users.findOne({ email: req.body.email });

    if (findAdmin) {
      return res.status(404).json({ message: "admin already registered" });
    }

    const newAdmin = new Users({
      email: req.body.email,
      password: req.body.password,
      isAdmin: true,
    });

    await newAdmin.save();

    res.json({
      message: "create new admin successfuly",
      data: newAdmin,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const deleteUsers = await Users.deleteMany();
    if (deleteUsers.deletedCount == 0) {
      return res.status(404).json({ message: "users (S) is not founds" });
    }
    res.json({
      message: "delete users successfuly",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUsers,
  profileUser,
  createAdmin,
};
