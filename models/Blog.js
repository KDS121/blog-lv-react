const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  blogTitle: {
    type: String,
  },
  blogDate: {
    type: Date,
    default: Date.now(),
  },
  blogData: {
    type: String,
  },
  blogMainImage: {
    type: String,
  },
  blogCategory: {
    type: String,
  },
});

try {
  Blogs = mongoose.model("blogs");
} catch (error) {
  Blogs = mongoose.model("blogs", blogSchema);
}

module.exports = Blogs;
