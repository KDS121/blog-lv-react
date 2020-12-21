const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  quizTitle: {
    type: String,
  },
  quizMainImage: {
    type: String,
  },
  quizCategory: {
    type: String,
  },
  triviaQuizQuestions: {
    type: Array,
  },
  personalityQuizQuestions: {
    type: Array,
  },
  personalityQuizResults: {
    type: Array,
  },
});

try {
  Quiz = mongoose.model("quiz");
} catch (error) {
  Quiz = mongoose.model("quiz", quizSchema);
}

module.exports = Quiz;
