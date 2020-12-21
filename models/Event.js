const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
  },
  eventFrom: {
    type: String,
  },
  eventTo: {
    type: String,
  },
  eventShortDescription: {
    type: String,
  },
  eventCategory: {
    type: String,
  },
  eventMainImage: {
    type: String,
  },
});

try {
  Events = mongoose.model("events");
} catch (error) {
  Events = mongoose.model("events", eventSchema);
}

module.exports = Events;
