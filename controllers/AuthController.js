const { Users, validaitionCreateUser } = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const invalidToken = new Set();
const login = async (req, res) => {
  try {
    // find user by email becouse it's username
    const findUser = await Users.findOne({ email: req.body.email });

    // check from FORM body inputs
    const { error } = validaitionCreateUser(req.body);

    if (error) {
      return res.json({ message: error.details[0].message });
    }

    // check from DB
    if (!findUser) {
      return res.status(404).json({ message: "email or password is invalid" });
    }
    // cut hash
    const checkPasswordAndCutHash = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!checkPasswordAndCutHash) {
      return res.status(404).json({ message: "email or password is invalid" });
    }
    const token = jwt.sign(
      // from DB email or var find scroll up - i want save the email the password not goos save with token
      {
        _id: findUser._id,
        email: findUser.email,
        isAdmin: findUser.isAdmin,
      },
      "tokenKey",
      { expiresIn: "1h" }
    );

    res.header("Authorization", token).json({
      data: findUser,
      token: token,
    });
  } catch (error) {
    res.json({
      message: "email or password is invalid",
      error: error,
    });
  }
};
const logout = async (req, res) => {
  try {
    const token = req.header("Authorization");
    invalidToken.add(token);
    res.json({ message: "logout successfuly" });
  } catch (error) {
    res.json({ error: error });
  }
};
module.exports = {
  login,
  logout,
  invalidToken,
};
