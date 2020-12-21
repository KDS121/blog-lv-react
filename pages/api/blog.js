// FIREBASE SET UP FILES
const admin = require("firebase-admin");
const serviceAccount = require("../../config/thelittlevoice-efc26-firebase-adminsdk-z20r1-fcc6dd43c3");

const mongoose = require("mongoose");
const mongoURI = require("../../config/mongo");

// if (!mongoose.connection.user) {
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  // () => console.log("MongoDB connected successfully!")
);
// }

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://thelittlevoice-efc26.appspot.com",
  });
}

var bucket = admin.storage().bucket();

var Blog = require("../../models/Blog");

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      if (req.query.key === "surya") {
        const newBlog = new Blog({
          blogData: req.body.blogData,
          blogTitle: req.body.blogTitle,
          blogCategory: req.body.blogCategory,
          blogMainImage: req.body.blogMainImage,
        });
        newBlog
          .save()
          .then((doc) => res.json(doc))
          .catch((err) => res.status(400).json({ error: "error" }));
      } else {
        res.json({ message: null });
      }
      break;
    }

    case "GET": {
      if (req.query.key === "surya") {
        if (req.query.demand === "images") {
          const [files] = await bucket.getFiles();
          let ImageArray = [];
          files.map((file) => {
            let URL =
              "https://firebasestorage.googleapis.com/v0/b/thelittlevoice-efc26.appspot.com/o/" +
              file.name +
              "?alt=media&token=" +
              file.metadata.metadata.firebaseStorageDownloadTokens;
            ImageArray.push({
              url: URL,
              contentType: file.metadata.contentType,
              name: file.name,
            });
          });
          res.json(ImageArray);
        } else if (req.query.demand === "data") {
          await Blog.find({})
            .sort({ _id: -1 })
            .then((docs, err) => {
              if (err) {
                res.status(400).json(err);
              } else {
                res.json(docs);
              }
            })
            .catch((err) => console.log(err));
        } else if (req.query.demand === "categorynumber") {
          await Blog.find({})
            .sort({ _id: -1 })
            .then((docs, err) => {
              if (err) {
                res.status(400).json(err);
              } else {
                var mentalhealthCount = 0;
                var moviereviewCount = 0;
                docs.forEach((blog) => {
                  if (blog.blogCategory === "Mental Health")
                    mentalhealthCount++;
                  else if (blog.blogCategory === "Reel to Real")
                    moviereviewCount++;
                });
                res.json({
                  mentalhealthCount,
                  moviereviewCount,
                });
              }
            })
            .catch((err) => res.status(400).json(err));
        }
      } else {
        res.json({ message: null });
      }

      break;
    }

    case "PUT": {
      if (req.query.key === "surya") {
        Blog.findByIdAndUpdate(
          {
            _id: req.body.id,
          },
          {
            blogData: req.body.blogData,
            blogTitle: req.body.blogTitle,
            blogCategory: req.body.blogCategory,
            blogMainImage: req.body.blogMainImage,
          }
        ).then((doc, err) => {
          if (err) {
            res.status(400).json({ success: "error" });
          } else {
            res.json(doc);
          }
        });
      } else {
        res.json({ message: null });
      }

      break;
    }

    case "DELETE": {
      if (req.query.key === "surya") {
        Blog.findByIdAndDelete({
          _id: req.query.id,
        }).then((doc, err) => {
          if (err) {
            res.status(400).json({ success: "error" });
          } else {
            res.json({ success: "done" });
          }
        });
      } else {
        res.json({ message: null });
      }

      break;
    }

    default:
      break;
  }
};
