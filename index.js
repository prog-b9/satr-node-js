const express = require("express");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const TasksRouter = require("./routes/TasksRoute");
const StudentRouter = require("./routes/StudentRoute");
const UserRouter = require("./routes/UserRoute");
const AuthRouter = require("./routes/AuthRoute");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// create Database and connection and set name
mongoose
  .connect("mongodb://127.0.0.1:27017/satr")
  .then(() => console.log("Database is Working"))
  .catch((error) => console.log("Database is Not Working", error));

//this is use becouse HTTP=>POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/todos", TasksRouter);
app.use("/api/students", StudentRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", AuthRouter);

// Page Not Fous 404
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Page Not Found 404",
  });
});
app.listen(port, () => console.log("express Is working", port));
