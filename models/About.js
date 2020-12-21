const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  aboutUsContent: {
    type: String,
  },
});

try {
  AboutUs = mongoose.model("aboutus");
} catch (error) {
  AboutUs = mongoose.model("aboutus", aboutSchema);
}

module.exports = AboutUs;
