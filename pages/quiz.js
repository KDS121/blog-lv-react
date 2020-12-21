import React from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";

import Host from "../config/host";

function quiz({ allQuizData, CategoryCountData }) {
  return (
    <>
      <Layout
        mentalhealthNumber={CategoryCountData.mentalhealthCount}
        moviereviewNumber={CategoryCountData.moviereviewCount}
      >
        <Head>
          <title>{"Quiz - Sane Tyzer"}</title>
        </Head>

        <div className="single-category-container">
          {/* BANNER */}
          <div
            className="single-category-banner"
            style={{
              background: `url(/assets/quizBanner.jpg)`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h3>Quiz</h3>
          </div>

          {/* OTHER CARDS */}
          <div className="single-category-cards-container">
            <div className="recent-posts-header single-category-section-header">
              <h3>Test your knowledge</h3>
            </div>
            <div className="single-category-section-container">
              {allQuizData.map((quiz) => {
                return (
                  <a
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
                    <div className="single-category-card-single">
                      <img src={quiz.quizMainImage} alt={quiz.quizTitle}></img>
                      <div className="single-category-card-content">
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
        </div>
      </Layout>
    </>
  );
}

quiz.getInitialProps = async (ctx) => {
  const categoryCountRes = await axios.get(
    `${Host}/api/blog?key=surya&demand=categorynumber`
  );
  const CategoryCountData = await categoryCountRes.data;

  const quizResponse = await axios.get(
    `${Host}/api/quiz?key=surya&demand=data`
  );
  const quizData = await quizResponse.data;

  return {
    CategoryCountData: CategoryCountData,
    allQuizData: quizData,
  };
};

export default quiz;
