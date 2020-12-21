// const nodemailer = require("nodemailer");
// const csv = require("csvtojson/v1");
// const schedule = require("node-schedule");
// const template = require("../../template");

// const mongoose = require("mongoose");
// const mongoURI = require("../../config/mongo");

// if (!mongoose.connection.user) {
//   mongoose.connect(
//     mongoURI,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     }
//     //   () => console.log("MongoDB connected successfully!")
//   );
// }

// const account = {
//   user: "mahlasurya@gmail.com",
//   pass: "ouqfxrxnnljcgayo",
// };

// var Newsletter = require("../../models/Newsletter");

// const firstTimeMessage = require("../../firstTimeMessage.js");

// const mailgun = require("mailgun-js");

// const DOMAIN = "sandboxc3a14c90f5ce4aef915b59fe7f37cb6c.mailgun.org";
// const mg = mailgun({
//   apiKey: "ba3a5269fdc5c3ef3433cded0ce8bb12-2fbe671d-0329f91e",
//   domain: DOMAIN,
// });

// const getMail = (name, email, cb) => {
//   const data = {
//     to: email,
//     from: "mahlasurya@gmail.com",
//     subject: "Welcome to the Sanetyzer Community",
//     html: firstTimeMessage(name),
//   };

//   mg.messages().send(data, function (error, body) {
//     if (error) {
//       console.log(error);
//       cb(error, null);
//     } else {
//       console.log(body);
//       cb(null, body);
//     }
//   });
// };

// export default async (req, res) => {
//   //   switch (req.method) {
//   //     case "POST": {
//   //       if (req.query.key === "surya") {
//   //         var { name, email } = req.body;
//   //         console.log(req.body);
//   //         const newNewsLetter = new Newsletter({
//   //           name: req.body.name,
//   //           email: req.body.email,
//   //         });
//   //         Newsletter.find({ email: req.body.email })
//   //           .then((docs, err) => {
//   //             console.log(docs);
//   //             if (err) {
//   //               res.status(400).json(err);
//   //             } else {
//   //               if (docs.length > 0) {
//   //                 res.json({ success: "done" });
//   //               } else {
//   //                 newNewsLetter
//   //                   .save()
//   //                   .then((doc) => {
//   //                     getMail(name, email, (error, data) => {
//   //                       if (error) {
//   //                         // res.status(400).json({ customerMessage: "internal Error" });
//   //                       } else {
//   //                         // res.json({ success: "done" });
//   //                       }
//   //                     });
//   //                     res.json({ success: "done" });
//   //                   })
//   //                   .catch((err) => res.status(400).json({ error: "error" }));
//   //               }
//   //             }
//   //           })
//   //           .catch((err) => console.log(err));
//   //         // Newsletter.find({ email: email }, (docs) => {
//   //         //   console.log(docs);
//   //         //   if (docs && docs.length > 0) {
//   //         //     res.json({ success: "done" });
//   //         //   } else {
//   //         //     newNewsLetter
//   //         //       .save()
//   //         //       .then((doc) => {
//   //         //         getMail(name, email, (error, data) => {
//   //         //           if (error) {
//   //         //             // res.status(400).json({ customerMessage: "internal Error" });
//   //         //           } else {
//   //         //             // res.json({ success: "done" });
//   //         //           }
//   //         //         });
//   //         //         res.json({ success: "done" });
//   //         //       })
//   //         //       .catch((err) => res.status(400).json({ error: "error" }));
//   //         //   }
//   //         // });
//   //       } else {
//   //         res.json({ message: null });
//   //       }
//   //       break;
//   //     }

//   //     case "GET": {
//   //       if (req.query.key === "surya") {
//   //         if (req.query.demand === "data") {
//   //           Newsletter.find({ email: "lamndj.dev@gmail.com" })
//   //             .then((docs, err) => {
//   //               if (err) {
//   //                 res.status(400).json(err);
//   //               } else {
//   //                 res.json(docs);
//   //               }
//   //             })
//   //             .catch((err) => console.log(err));
//   //         }
//   //       } else {
//   //         res.json({ message: null });
//   //       }

//   //       break;
//   //     }

//   //     case "PUT": {
//   //       if (req.query.key === "surya") {
//   //         About.findByIdAndUpdate(
//   //           {
//   //             _id: req.body.id,
//   //           },
//   //           {
//   //             aboutUsContent: req.body.aboutUsContent,
//   //           }
//   //         ).then((doc, err) => {
//   //           if (err) {
//   //             res.status(400).json({ success: "error" });
//   //           } else {
//   //             res.json(doc);
//   //           }
//   //         });
//   //       } else {
//   //         res.json({ message: null });
//   //       }

//   //       break;
//   //     }

//   //     case "DELETE": {
//   //       if (req.query.key === "surya") {
//   //         About.findByIdAndDelete({
//   //           _id: req.query.id,
//   //         }).then((doc, err) => {
//   //           if (err) {
//   //             res.status(400).json({ success: "error" });
//   //           } else {
//   //             res.json({ success: "done" });
//   //           }
//   //         });
//   //       } else {
//   //         res.json({ message: null });
//   //       }

//   //       break;
//   //     }

//   //     default:
//   //       break;
//   //   }
//   var transporter = nodemailer.createTransport({
//     // pool: true, //keeps the server connection open
//     // host: "smtp.gmail.com", //your email server
//     // port: 465, //gmail uses SSL
//     // secure: true, //gmail sends secure
//     // auth: {
//     //   user: account.user,
//     //   pass: account.pass,

//     // },
//     sendmail: true,
//     // newline: "unix",
//     // path: "/usr/sbin/sendmail",
//   });

//   var testfile = "./test_list.csv";
//   //my test list
//   var prodfile = "./list.csv";
//   //path to our production list
//   var sendlist = [
//     { first: "Surya", email: "lamndj.dev@gmail.com" },
//     // { first: "Karan", email: "karandeep0998@gmail.com" },
//   ];
//   // empty array where we'll keep
//   //all our contacts
//   var message_increment = 0;
//   //variable to move to the next
//   //contact

//   function trigger_sending(env) {
//     //env passes our email and name to
//     //customize the message
//     var emailbody = template.generate(env.first).toString();
//     //generates a string to send
//     //the personalized HTML
//     transporter.sendMail(
//       {
//         // from: "mahlasurya@gmail.com",
//         from: "klientkarya@gmail.com",
//         to: env.email, //email address of our recipient
//         subject: "Events and first impressions At The Door ",
//         //   text: "##Plaintext version of the message##",
//         html: emailbody,
//         //   replyTo: "info@klientkarya.com",
//       },
//       (error, info) => {
//         if (error) {
//           return console.log(error);
//         }
//         console.log("Message sent: %s", info.messageId);
//       }
//     );
//   }

//   function set_message_delays() {
//     var message_job = schedule.scheduleJob("*/2 * * * * *", function () {
//       trigger_sending(sendlist[message_increment]);
//       if (message_increment < sendlist.length) {
//         message_increment++;
//         // if our increment is less than our list length,
//         // we'll keep sending
//       }
//       if (message_increment >= sendlist.length) {
//         message_job.cancel();
//         res.send("done!");
//         // stop our function when last message is sent
//       }
//     });
//   }

//   function get_list() {
//     // csv().fromFile(testfile) //or your production list
//     // .on('json', (jsonObj) => {
//     //      sendlist.push(jsonObj);
//     // })
//     // .on('done', () => {
//     //     set_message_delays();
//     // })
//     set_message_delays();
//   }

//   transporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//       get_list();
//       // trigger the whole app once the mail server is ready
//     }
//   });
// };
