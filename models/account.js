const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accounSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Account", accounSchema);
