const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newletterSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

try {
  NewsLetter = mongoose.model("newletter");
} catch (error) {
  NewsLetter = mongoose.model("newletter", newletterSchema);
}

module.exports = NewsLetter;
