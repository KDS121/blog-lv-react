import React, { Component } from "react";

export default class RecentPosts extends Component {
  render() {
    return (
      <>
        <div className="quiz-home-container">
          <div className="quiz-home-header">
            <h3>quiz</h3>
          </div>
          <div className="quiz-home-cards-container">
            {this.props.allQuizData.map((quiz, index) => {
              if (index < 6)
                return (
                  <a
                    key={"quiz" + index}
                    href={
                      "/quiz/" +
                      quiz.quizTitle
                        .toString()
                        .split(" ")
                        .join("")
                        .toString()
                        .split("&")
                        .join("and")
                        .toString()
                        .split("-")
                        .join("") +
                      "||" +
                      quiz._id
                    }
                  >
                    <div className="quiz-home-card-single">
                      <img src={quiz.quizMainImage} alt={quiz.quizTitle}></img>
                      <div className="recent-post-card-content">
                        <h3>{quiz.quizCategory}</h3>
                        <h4>{quiz.quizTitle}</h4>
                        <p>
                          <strong>Sane Tyzer</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                );
            })}
          </div>
        </div>
      </>
    );
  }
}
