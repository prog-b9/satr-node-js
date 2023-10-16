const mongoose = require("mongoose");
// create Schema Object data
const Schema = new mongoose.Schema({
  title: String,
});
// create Modal or Document / tabel / collection
const Tasks = mongoose.model("tasks", Schema);

module.exports = Tasks;
