const mongoose = require("mongoose")
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,

})
const model = mongoose.model("admin", AdminSchema)

module.exports = model