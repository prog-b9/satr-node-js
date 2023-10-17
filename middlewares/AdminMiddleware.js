const AdminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.json({ message: "you are not Admin" });
  }
};

module.exports = AdminMiddleware;
