import React, { Component } from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { FacebookShareButton } from "react-share";

export default class SingleQuizContent extends Component {
  constructor() {
    super();
    this.state = {
      pageURL: "",
      finalResultArray: [],
      showPersonalityResult: false,
      personalityResult: {},
      count: 0,
    };
    this.myRef = React.createRef();
    this.resultRef = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ pageURL: window.location.href });
    var finalResultArray = [];
    this.props.singleQuizOBJ.personalityQuizResults.forEach((result) => {
      finalResultArray.push({
        title: result.title,
        description: result.description,
        image: result.image,
        count: 0,
      });
    });
    this.setState({ finalResultArray: finalResultArray });
  };

  checkAnswer = (question, option, index) => {
    const cheer = document.getElementById("cheer-sound");
    const boo = document.getElementById("wrong-sound");

    document
      .getElementById("personality-question-desc" + index)
      .classList.add("show");

    question.options.forEach((optionOBJ, i) => {
      if (option === optionOBJ && question.answer === option) {
        document
          .getElementById(question.question + "option" + i)
          .classList.add("correct");
      } else if (option !== optionOBJ && question.answer === optionOBJ) {
        document
          .getElementById(question.question + "option" + i)
          .classList.add("correct");
      } else
        document
          .getElementById(question.question + "option" + i)
          .classList.add("wrong");
    });
    if (option === question.answer) {
      // if (!cheer.paused) {
      cheer.currentTime = 0;
      cheer.play();
      // }
      // document.querySelector(".correct-answer-gif").classList.add("show");
      // setTimeout(() => {
      //   document.querySelector(".correct-answer-gif").classList.remove("show");
      // }, 2000);
    } else {
      // if (!boo.paused) {
      boo.currentTime = 0;
      boo.play();
      // }
    }
    document
      .getElementById("question-options" + index)
      .classList.add("blockQuestion");
  };

  calculateResult = (question, option, index, i) => {
    this.setState({ count: this.state.count + 1 }, () => {
      document
        .getElementById("personality-question-desc" + index)
        .classList.add("show");

      var { title, answer } = option;
      document
        .getElementById(question.question + "option" + i)
        .classList.add("selected");

      document
        .getElementById("question-options" + index)
        .classList.add("blockQuestion");

      this.state.finalResultArray.forEach((result) => {
        if (result.title === answer) {
          result.count++;
        }
      });
      this.setState({ finalResultArray: this.state.finalResultArray }, () => {
        this.state.finalResultArray.sort((a, b) => {
          if (a.count > b.count) return -1;
          else if (a.count < b.count) return 1;
          else return 0;
        });
        this.setState({ finalResultArray: this.state.finalResultArray }, () => {
          if (
            this.state.count ===
            this.props.singleQuizOBJ.personalityQuizQuestions.length
          ) {
            this.setState(
              {
                showPersonalityResult: true,
                personalityResult: this.state.finalResultArray[0],
              },
              () => {
                window.scrollTo(0, this.resultRef.current.offsetTop - 200);
              }
            );
          }
        });
      });
    });
  };

  retakeQuiz = () => {
    this.props.singleQuizOBJ.personalityQuizQuestions.forEach(
      (question, index) => {
        document
          .getElementById("personality-question-desc" + index)
          .classList.remove("show");
        document
          .getElementById("question-options" + index)
          .classList.remove("blockQuestion");
        question.options.forEach((option, i) => {
          document
            .getElementById(question.question + "option" + i)
            .classList.remove("selected");
        });
      }
    );
    this.state.finalResultArray.forEach((result) => {
      result.count = 0;
    });
    this.setState({
      showPersonalityResult: false,
      personalityResult: {},
      count: 0,
      finalResultArray: this.state.finalResultArray,
    });
    window.scrollTo(0, this.myRef.current.offsetTop - 200);
  };

  render() {
    return (
      <div className="single-blog-content-container">
        {/* <img
          src="/assets/correctAnswer.gif"
          className="correct-answer-gif"
        ></img> */}
        <audio id="cheer-sound">
          <source src="/assets/cheer.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="wrong-sound">
          <source src="/assets/crowd-groan.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* blog content */}
        <div className="single-quiz-container" ref={this.myRef}>
          {this.props.singleQuizOBJpreview ? (
            this.props.singleQuizOBJpreview.map((question, index) => {
              return (
                <div className="single-quiz-question-card">
                  <h3>
                    {"Question #" + (index + 1) + " | " + question.question}
                  </h3>
                  <div
                    className="single-quiz-question-card-options"
                    id={"question-options" + index}
                  >
                    {question.options.map((option, i) => {
                      return (
                        <div
                          className="single-quiz-question-card-option-single"
                          onClick={() =>
                            this.checkAnswer(question, option, index)
                          }
                          id={question.question + "option" + i}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : this.props.singleQuizOBJ.quizCategory === "trivia" ? (
            this.props.singleQuizOBJ.triviaQuizQuestions.map(
              (question, index) => {
                return (
                  <div className="single-quiz-question-card">
                    <h3>
                      {"Question #" + (index + 1) + " | " + question.question}
                    </h3>
                    <div
                      className="single-quiz-question-card-options"
                      id={"question-options" + index}
                    >
                      {question.options.map((option, i) => {
                        return (
                          <div
                            className="single-quiz-question-card-option-single"
                            onClick={() =>
                              this.checkAnswer(question, option, index)
                            }
                            id={question.question + "option" + i}
                          >
                            {option}
                          </div>
                        );
                      })}
                    </div>
                    <p
                      className="question-description-tag"
                      id={"personality-question-desc" + index}
                    >
                      {question.questionDescription}
                    </p>
                  </div>
                );
              }
            )
          ) : (
            <>
              {this.props.singleQuizOBJ.personalityQuizQuestions.map(
                (question, index) => {
                  return (
                    <div className="single-quiz-question-card">
                      <h3>
                        {"Question #" + (index + 1) + " | " + question.question}
                      </h3>
                      <div
                        className="single-quiz-question-card-options"
                        id={"question-options" + index}
                      >
                        {question.options.map((option, i) => {
                          return (
                            <div
                              className="single-quiz-question-card-option-single"
                              onClick={() =>
                                this.calculateResult(question, option, index, i)
                              }
                              id={question.question + "option" + i}
                            >
                              {option.title}
                            </div>
                          );
                        })}
                      </div>
                      <p
                        className="question-description-tag"
                        id={"personality-question-desc" + index}
                      >
                        {question.questionDescription}
                      </p>
                    </div>
                  );
                }
              )}
              {this.state.showPersonalityResult ? (
                <div
                  className="personality-quiz-result-container"
                  ref={this.resultRef}
                >
                  <h3>{"You are: " + this.state.personalityResult.title}</h3>
                  <div className="personality-quiz-result-image">
                    <img src={this.state.personalityResult.image}></img>
                    <div className="personality-quiz-result-share-section">
                      <p>{this.state.personalityResult.description}</p>
                      <div className="single-blog-share-section">
                        <FacebookShareButton
                          url={this.state.pageURL.toString()}
                          quote={
                            "I got " +
                            this.state.personalityResult.title +
                            ". " +
                            this.props.singleQuizOBJ.quizTitle
                              .toString()
                              .split("&")
                              .join("and") +
                            " | Sane Tyzer"
                          }
                          // hashtag="#thelittlevoice"
                          style={{ outline: "none" }}
                        >
                          <span className="single-blog-share-section-facebook">
                            <FacebookIcon className="single-blog-share-icon" />
                            <h4>share</h4>
                          </span>
                        </FacebookShareButton>
                        <span
                          className="single-blog-share-section-twitter"
                          onClick={
                            this.props.singleQuizOBJpreview
                              ? null
                              : () =>
                                  window.open(
                                    "https://api.whatsapp.com/send?text=" +
                                      "I got " +
                                      this.state.personalityResult.title +
                                      ". " +
                                      this.props.singleQuizOBJ.quizTitle +
                                      " | Sane Tyzer " +
                                      window.location.href
                                  )
                          }
                        >
                          <WhatsAppIcon className="single-blog-share-icon" />
                          <h4>share</h4>
                        </span>
                        <span className="reset-quiz" onClick={this.retakeQuiz}>
                          Retake Quiz
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  }
}
