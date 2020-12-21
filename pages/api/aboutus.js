// FIREBASE SET UP FILES
const admin = require("firebase-admin");
const serviceAccount = require("../../config/thelittlevoice-efc26-firebase-adminsdk-z20r1-fcc6dd43c3");

const mongoose = require("mongoose");
const mongoURI = require("../../config/mongo");

if (!mongoose.connection.user) {
  mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
    //   () => console.log("MongoDB connected successfully!")
  );
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://thelittlevoice-efc26.appspot.com",
  });
}

var About = require("../../models/About");

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      if (req.query.key === "surya") {
        const newAboutUs = new About({
          aboutUsContent: req.body.aboutUsContent,
        });
        newAboutUs
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
        if (req.query.demand === "data") {
          About.find({})
            .sort({ _id: -1 })
            .then((docs, err) => {
              if (err) {
                res.status(400).json(err);
              } else {
                res.json(docs);
              }
            })
            .catch((err) => console.log(err));
        }
      } else {
        res.json({ message: null });
      }

      break;
    }

    case "PUT": {
      if (req.query.key === "surya") {
        About.findByIdAndUpdate(
          {
            _id: req.body.id,
          },
          {
            aboutUsContent: req.body.aboutUsContent,
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
        About.findByIdAndDelete({
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
