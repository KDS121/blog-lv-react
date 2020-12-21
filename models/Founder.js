const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const founderSchema = new Schema({
  FounderName: {
    type: String,
  },
  FounderContent: {
    type: String,
  },
  FounderImageURL: {
    type: String,
  },
});

try {
  Founder = mongoose.model("founder");
} catch (error) {
  Founder = mongoose.model("founder", founderSchema);
}

module.exports = Founder;
