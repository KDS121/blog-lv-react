import React, { Component } from "react";
import QuillNoSSRWrapper from "../Quil/Quill";
import axios from "axios";

import SingleQuizContent from "../SingleQuizContent/SingleQuizContent";

import * as firebase from "firebase/app";
import "firebase/storage";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class AdminQuiz extends Component {
  constructor() {
    super();
    this.state = {
      quizTitle: "",
      quizMainImage: "",
      quizCategory: "Trivia",
      triviaQuizQuestions: [
        {
          question: "",
          questionDescription: "",
          options: [""],
          answer: "",
        },
      ],
      personalityQuizQuestions: [
        {
          question: "",
          questionDescription: "",
          options: [
            {
              title: "",
              answer: "",
            },
          ],
        },
      ],
      personalityQuizResults: [
        {
          title: "",
          description: "",
          image: "",
        },
      ],
      quizImageSuccess: false,
      quizAddedSuccess: false,
      quizDeletedSuccess: false,
      openPreview: false,
      openBackdrop: false,
      updateQuiz: false,
      updatedQuizID: "",
      viewForm: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onDropDownChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  inputImage = () => {
    document.getElementById("quizImage").click();
  };

  onFileUpload = (e) => {
    e.persist();
    if (e.target.files[0]) {
      this.setState({ openBackdrop: true });
      const storage = firebase.storage();

      var storageRef = storage.ref();

      var metadata = {
        contentType: "image/jpeg",
      };

      let quizImageName = "thelittlevoicequiz";

      var uploadTask = storageRef
        .child(
          quizImageName + "-mainImage-" + (this.props.allBlogsImages.length + 1)
        )
        .put(e.target.files[0], metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          //   var progress =
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("");
              break;
            default:
              console.log("");
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("no rights");
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              console.log("cancelled");
              // User canceled the upload
              break;

            case "storage/unknown":
              console.log("unknown error");
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              console.log("");
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          this.setState({ quizImageSuccess: true });
          this.setState({ openBackdrop: false });
          this.props.refreshBlogImages();
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function (downloadURL) {});
        }
      );
    } else {
      this.setState({ [e.target.id]: null });
    }
  };

  copyImageURL = (image) => {
    this.setState({
      quizMainImage: image.url,
    });
  };

  deleteimage = (image) => {
    const storage = firebase.storage();
    var storageRef = storage.ref();
    var mainImageRef = storageRef.child(image.name);
    mainImageRef
      .delete()
      .then(() => {
        this.props.refreshBlogImages();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleClose = () => {
    this.setState({ quizImageSuccess: false });
    this.setState({ quizAddedSuccess: false });
    this.setState({ quizDeletedSuccess: false });
    this.setState({ openPreview: false });
  };

  storeNewQuiz = () => {
    // this.setState({ openPreview: true });
    this.confirmEvent();
  };

  confirmEvent = () => {
    this.setState({ openBackdrop: true });
    this.setState({ openPreview: false });

    const body = {
      quizTitle: this.state.quizTitle,
      quizMainImage: this.state.quizMainImage,
      quizCategory: this.state.quizCategory,
      triviaQuizQuestions: this.state.triviaQuizQuestions,
      personalityQuizQuestions: this.state.personalityQuizQuestions,
      personalityQuizResults: this.state.personalityQuizResults,
    };

    if (this.state.updateQuiz) {
      body.id = this.state.updatedQuizID;
      axios
        .put("/api/quiz?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ quizAddedSuccess: true });
            this.props.refreshQuizData();
            this.setState({
              quizTitle: "",
              quizMainImage: "",
              quizCategory: "Trivia",
              triviaQuizQuestions: [
                {
                  question: "",
                  questionDescription: "",
                  options: [""],
                  answer: "",
                },
              ],
              personalityQuizQuestions: [
                {
                  question: "",
                  questionDescription: "",
                  options: [
                    {
                      title: "",
                      answer: "",
                    },
                  ],
                },
              ],
              personalityQuizResults: [
                {
                  title: "",
                  description: "",
                  image: "",
                },
              ],
              viewForm: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    } else {
      axios
        .post("/api/quiz?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ quizAddedSuccess: true });
            this.props.refreshQuizData();
            this.setState({
              quizTitle: "",
              quizMainImage: "",
              quizCategory: "Trivia",
              triviaQuizQuestions: [
                {
                  question: "",
                  questionDescription: "",
                  options: [""],
                  answer: "",
                },
              ],
              personalityQuizQuestions: [
                {
                  question: "",
                  questionDescription: "",
                  options: [
                    {
                      title: "",
                      answer: "",
                    },
                  ],
                },
              ],
              personalityQuizResults: [
                {
                  title: "",
                  description: "",
                  image: "",
                },
              ],
              viewForm: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    }
  };

  editQuiz = (quiz) => {
    this.setState({
      viewForm: true,
      updateQuiz: true,
      quizTitle: quiz.quizTitle,
      quizMainImage: quiz.quizMainImage,
      quizCategory: quiz.quizCategory,
      triviaQuizQuestions: quiz.triviaQuizQuestions,
      personalityQuizQuestions: quiz.personalityQuizQuestions,
      personalityQuizResults: quiz.personalityQuizResults,
      updatedQuizID: quiz._id,
    });
  };

  cancelForm = () => {
    this.setState({
      viewForm: false,
      updateQuiz: false,
      quizTitle: "",
      quizMainImage: "",
      quizCategory: "Trivia",
      triviaQuizQuestions: [
        {
          question: "",
          questionDescription: "",
          options: [""],
          answer: "",
        },
      ],
      personalityQuizQuestions: [
        {
          question: "",
          questionDescription: "",
          options: [
            {
              title: "",
              answer: "",
            },
          ],
        },
      ],
      personalityQuizResults: [
        {
          title: "",
          description: "",
          image: "",
        },
      ],
      updatedQuizID: "",
    });
  };

  addNewQuiz = () => {
    this.setState({
      viewForm: true,
    });
  };

  deleteQuiz = (quiz) => {
    if (window.confirm("Delete" + quiz.quizTitle + "?")) {
      this.setState({ openBackdrop: true });
      axios
        .delete(`/api/quiz?key=surya&id=${quiz._id}`)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ quizDeletedSuccess: true });
            this.props.refreshQuizData();
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    }
  };

  addMoreQuestions = () => {
    if (this.state.triviaQuizQuestions.length < 10) {
      var triviaQuizQuestions = this.state.triviaQuizQuestions;
      triviaQuizQuestions.push({
        question: "",
        questionDescription: "",
        options: [""],
        answer: "",
      });
      this.setState({ triviaQuizQuestions: triviaQuizQuestions });
    }
  };

  addMoreResults = () => {
    // if (this.state.triviaQuizQuestions.length < 10) {
    var personalityQuizResults = this.state.personalityQuizResults;
    personalityQuizResults.push({
      title: "",
      description: "",
      image: "",
    });
    this.setState({ personalityQuizResults: personalityQuizResults });
    // }
  };

  addMorePersonalityQuestions = () => {
    // if (this.state.triviaQuizQuestions.length < 10) {
    var personalityQuizQuestions = this.state.personalityQuizQuestions;
    personalityQuizQuestions.push({
      question: "",
      questionDescription: "",
      options: [
        {
          title: "",
          answer: "",
        },
      ],
    });
    this.setState({ personalityQuizQuestions: personalityQuizQuestions });
    // }
  };

  deleteQuestion = (index) => {
    var triviaQuizQuestions = this.state.triviaQuizQuestions;
    triviaQuizQuestions.splice(index, 1);
    this.setState({ triviaQuizQuestions: triviaQuizQuestions });
  };

  deleteResult = (index) => {
    var personalityQuizResults = this.state.personalityQuizResults;
    personalityQuizResults.splice(index, 1);
    this.setState({ personalityQuizResults: personalityQuizResults });
  };

  addMoreOptions = (questionIndex) => {
    if (this.state.triviaQuizQuestions[questionIndex].options.length < 4) {
      var triviaQuizQuestions = this.state.triviaQuizQuestions;
      triviaQuizQuestions[questionIndex].options.push("");
      this.setState({ triviaQuizQuestions: triviaQuizQuestions });
    }
  };

  deleteOption = (questionIndex, optionIndex) => {
    var triviaQuizQuestions = this.state.triviaQuizQuestions;
    triviaQuizQuestions[questionIndex].options.splice(optionIndex, 1);
    this.setState({ triviaQuizQuestions: triviaQuizQuestions });
  };

  onQuesChange = (e, questionIndex) => {
    var _state = e.target.id.toString().split("-")[0];
    var triviaQuizQuestions = this.state.triviaQuizQuestions;
    triviaQuizQuestions[questionIndex][_state] = e.target.value;
    this.setState({ triviaQuizQuestions: triviaQuizQuestions });
  };

  onResultChange = (e, resultIndex) => {
    var _state = e.target.id.toString().split("-")[0];
    var personalityQuizResults = this.state.personalityQuizResults;
    personalityQuizResults[resultIndex][_state] = e.target.value;
    this.setState({ personalityQuizResults: personalityQuizResults });
  };

  onAnswerChange = (e, questionIndex) => {
    var triviaQuizQuestions = this.state.triviaQuizQuestions;
    triviaQuizQuestions[questionIndex].answer = e.target.value;
    this.setState({ triviaQuizQuestions: triviaQuizQuestions });
  };

  onOptionChange = (e, questionIndex, optionIndex) => {
    var triviaQuizQuestions = this.state.triviaQuizQuestions;
    triviaQuizQuestions[questionIndex].options[optionIndex] = e.target.value;
    this.setState({ triviaQuizQuestions: triviaQuizQuestions });
  };

  deletePersonalityQuestion = (index) => {
    var personalityQuizQuestions = this.state.personalityQuizQuestions;
    personalityQuizQuestions.splice(index, 1);
    this.setState({ personalityQuizQuestions: personalityQuizQuestions });
  };

  onPersonalityQuesChange = (e, questionIndex) => {
    var _state = e.target.id.toString().split("-")[0];
    var personalityQuizQuestions = this.state.personalityQuizQuestions;
    personalityQuizQuestions[questionIndex][_state] = e.target.value;
    this.setState({ personalityQuizQuestions: personalityQuizQuestions });
  };

  deletePersonalityOption = (questionIndex, optionIndex) => {
    var personalityQuizQuestions = this.state.personalityQuizQuestions;
    personalityQuizQuestions[questionIndex].options.splice(optionIndex, 1);
    this.setState({ personalityQuizQuestions: personalityQuizQuestions });
  };

  onPersonalityOptionChange = (e, questionIndex, optionIndex) => {
    var _state = e.target.id.toString().split("-")[0];
    var personalityQuizQuestions = this.state.personalityQuizQuestions;
    personalityQuizQuestions[questionIndex].options[optionIndex][_state] =
      e.target.value;
    this.setState({ personalityQuizQuestions: personalityQuizQuestions });
  };

  addMorePersonalityOptions = (questionIndex) => {
    if (this.state.personalityQuizQuestions[questionIndex].options.length < 4) {
      var personalityQuizQuestions = this.state.personalityQuizQuestions;
      personalityQuizQuestions[questionIndex].options.push({
        title: "",
        answer: "",
      });
      this.setState({ personalityQuizQuestions: personalityQuizQuestions });
    }
  };

  render() {
    const questions = this.state.triviaQuizQuestions.map((question, index) => {
      return (
        <div className="admin-quiz-single-ques-card">
          <div className="admin-quiz-single-ques-header">
            <h3>{"Question #" + (index + 1)}</h3>
            <p
              className="admin-quiz-delete-question-icon"
              onClick={() => this.deleteQuestion(index)}
            >
              X
            </p>
          </div>
          <input
            className="admin-quiz-single-ques-card-input"
            id={"question-" + index}
            value={question.question}
            onChange={(e) => this.onQuesChange(e, index)}
            placeholder="Question"
          ></input>
          <input
            className="admin-quiz-single-ques-card-input"
            id={"questionDescription-" + index}
            value={question.questionDescription}
            onChange={(e) => this.onQuesChange(e, index)}
            placeholder="Question Description"
          ></input>
          <div className="admin-quiz-single-ques-options">
            {question.options.map((option, i) => {
              return (
                <div className="admin-quiz-single-option-header">
                  <input
                    className="admin-quiz-single-option-card-input"
                    id={"option-" + i}
                    value={option}
                    onChange={(e) => this.onOptionChange(e, index, i)}
                    placeholder="Option"
                  ></input>
                  <p
                    className="admin-quiz-delete-option-icon"
                    onClick={() => this.deleteOption(index, i)}
                  >
                    X
                  </p>
                </div>
              );
            })}
          </div>
          <select
            id={"answer-" + index}
            className="admin-quiz-single-ques-card-input"
            value={question.answer}
            onChange={(e) => this.onAnswerChange(e, index)}
            placeholder="Answer"
          >
            {question.options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
          <button onClick={() => this.addMoreOptions(index)}>
            Add More options
          </button>
        </div>
      );
    });

    const personalityQuizQuestions = this.state.personalityQuizQuestions.map(
      (question, index) => {
        return (
          <div className="admin-quiz-single-ques-card">
            <div className="admin-quiz-single-ques-header">
              <h3>{"Question #" + (index + 1)}</h3>
              <p
                className="admin-quiz-delete-question-icon"
                onClick={() => this.deletePersonalityQuestion(index)}
              >
                X
              </p>
            </div>
            <input
              className="admin-quiz-single-ques-card-input"
              id={"question-" + index}
              value={question.question}
              onChange={(e) => this.onPersonalityQuesChange(e, index)}
              placeholder="Question"
            ></input>
            <input
              className="admin-quiz-single-ques-card-input"
              id={"questionDescription-" + index}
              value={question.questionDescription}
              onChange={(e) => this.onPersonalityQuesChange(e, index)}
              placeholder="Question Description"
            ></input>
            <div className="admin-quiz-single-ques-options">
              {question.options.map((option, i) => {
                return (
                  <div className="admin-quiz-single-option-header admin-personality-quiz-options-header">
                    <div className="admin-personality-quiz-options">
                      <input
                        className="admin-quiz-single-option-card-input"
                        id={"title-" + i}
                        value={option.title}
                        onChange={(e) =>
                          this.onPersonalityOptionChange(e, index, i)
                        }
                        placeholder="Option title"
                      ></input>
                      <select
                        id={"answer-" + index}
                        className="admin-quiz-single-ques-card-input"
                        value={option.answer}
                        onChange={(e) =>
                          this.onPersonalityOptionChange(e, index, i)
                        }
                        placeholder="Answer"
                      >
                        {this.state.personalityQuizResults.map((result) => {
                          return (
                            <option value={result.title}>{result.title}</option>
                          );
                        })}
                      </select>
                    </div>
                    <p
                      className="admin-quiz-delete-option-icon"
                      onClick={() => this.deletePersonalityOption(index, i)}
                    >
                      X
                    </p>
                  </div>
                );
              })}
            </div>
            <button onClick={() => this.addMorePersonalityOptions(index)}>
              Add More options
            </button>
          </div>
        );
      }
    );

    const personalityQuizResults = this.state.personalityQuizResults.map(
      (result, index) => {
        return (
          <div className="admin-quiz-single-ques-card">
            <div className="admin-quiz-single-ques-header">
              <h3>{"Result #" + (index + 1)}</h3>
              <p
                className="admin-quiz-delete-question-icon"
                onClick={() => this.deleteResult(index)}
              >
                X
              </p>
            </div>
            <input
              className="admin-quiz-single-ques-card-input"
              id={"title-" + index}
              value={result.title}
              onChange={(e) => this.onResultChange(e, index)}
              placeholder="Result"
            ></input>
            <input
              className="admin-quiz-single-ques-card-input"
              id={"description-" + index}
              value={result.description}
              onChange={(e) => this.onResultChange(e, index)}
              placeholder="Result Description"
            ></input>
            <input
              className="admin-quiz-single-ques-card-input"
              id={"image-" + index}
              value={result.image}
              onChange={(e) => this.onResultChange(e, index)}
              placeholder="Result image URL"
            ></input>
          </div>
        );
      }
    );

    return (
      <>
        <Backdrop className="backdrop" open={this.state.openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={this.state.quizImageSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Image Uploaded.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.quizAddedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Quiz Uploaded.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.quizDeletedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="error"
          >
            Quiz Deleted.
          </MuiAlert>
        </Snackbar>

        <div className="admin-event-container">
          <div className="admin-event-view-section">
            {this.state.viewForm ? (
              <>
                <div className="admin-view-quiz-section">
                  <div className="admin-event-form-section">
                    <TextField
                      className="admin-event-text-filed admin-quiz-text-field"
                      id="quizTitle"
                      value={this.state.quizTitle}
                      label="Quiz Title"
                      variant="outlined"
                      onChange={this.onChange}
                    />
                    <TextField
                      className="admin-event-text-filed admin-quiz-text-field"
                      id="quizMainImage"
                      value={this.state.quizMainImage}
                      label="Quiz Image"
                      variant="outlined"
                      onChange={this.onChange}
                    />
                    <FormControl
                      variant="outlined"
                      className="admin-event-text-filed admin-quiz-text-field"
                    >
                      <InputLabel id="quiz-category-label">Category</InputLabel>
                      <Select
                        labelId="quiz-category-label"
                        name="quizCategory"
                        value={this.state.quizCategory}
                        onChange={this.onDropDownChange}
                        label="Category"
                      >
                        <MenuItem value="Trivia">Trivia</MenuItem>
                        <MenuItem value="Personality">Personality</MenuItem>
                      </Select>
                    </FormControl>
                    <img src={this.state.quizMainImage}></img>
                  </div>
                  {this.state.quizCategory === "Personality" ? (
                    <div className="admin-quiz-personality-form-section">
                      {personalityQuizResults}
                      <button
                        className="admin-quiz-form-section-button"
                        onClick={this.addMoreResults}
                      >
                        Add More Results
                      </button>
                      {personalityQuizQuestions}
                      <button
                        className="admin-quiz-form-section-button"
                        onClick={this.addMorePersonalityQuestions}
                      >
                        Add More Questions
                      </button>
                    </div>
                  ) : (
                    <div className="admin-quiz-form-section">{questions}</div>
                  )}
                </div>
                {this.state.quizCategory === "Personality" ? (
                  <></>
                ) : (
                  <button
                    className="admin-quiz-form-section-button"
                    onClick={this.addMoreQuestions}
                  >
                    Add More Questions
                  </button>
                )}
                <button className="save-blog-btn" onClick={this.storeNewQuiz}>
                  Save
                </button>
                <button className="save-blog-btn" onClick={this.cancelForm}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <TableContainer component={Paper} className="admin-event-table">
                  <Table stickyHeader size="small" aria-label="blog table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">S.no</TableCell>
                        <TableCell>Quiz Title</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.allQuizData.map((quiz, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell>{quiz.quizTitle}</TableCell>
                          <TableCell align="center">
                            <EditIcon
                              onClick={() => this.editQuiz(quiz)}
                              className="admin-event-table-icon"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <DeleteForeverIcon
                              onClick={() => this.deleteQuiz(quiz)}
                              className="admin-event-table-icon"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <button className="save-blog-btn" onClick={this.addNewQuiz}>
                  Add New
                </button>
              </>
            )}
          </div>
          <div className="admin-event-image-section">
            <div className="admin-event-image-container">
              {this.props.allBlogsImages.map((image) => {
                if (
                  image.name
                    .toString()
                    .toLowerCase()
                    .includes("thelittlevoicequiz")
                )
                  return (
                    <div className="admin-event-existing-image">
                      <img
                        onClick={() => this.copyImageURL(image)}
                        src={image.url}
                      ></img>
                      <p onClick={() => this.deleteimage(image)}>X</p>
                    </div>
                  );
                else return null;
              })}
              <input
                type="file"
                id="quizImage"
                onChange={this.onFileUpload}
                style={{ display: "none" }}
              ></input>
            </div>
            <button
              className="admin-event-image-footer"
              onClick={this.inputImage}
            >
              Upload New Image
            </button>
          </div>
        </div>

        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={this.state.openPreview}
          onClose={this.handleClose}
          aria-labelledby="Preview Blog"
        >
          <DialogTitle id="Preview Blog">Quiz Preview</DialogTitle>
          <DialogContent>
            <SingleQuizContent
              singleQuizOBJpreview={this.state.triviaQuizQuestions}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.confirmEvent} color="primary">
              Confirm
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
