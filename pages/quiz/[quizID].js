import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

import SingleQuizContent from "../../components/SingleQuizContent/SingleQuizContent";

import Host from "../../config/host";

function quizID({ allQuizData, CategoryCountData }) {
  const router = useRouter();
  var { quizID } = router.query;
  quizID = quizID.toString().split("||")[1];

  var singleQuizOBJ = allQuizData.filter((quiz) => quiz._id === quizID);

  if (singleQuizOBJ.length > 0) {
    singleQuizOBJ = singleQuizOBJ[0];

    return (
      <>
        <Layout
          mentalhealthNumber={CategoryCountData.mentalhealthCount}
          moviereviewNumber={CategoryCountData.moviereviewCount}
        >
          <Head>
            <title>{singleQuizOBJ.quizTitle + " - Sane Tyzer"}</title>
          </Head>
          <div
            className="single-blog-banner"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${singleQuizOBJ.quizMainImage})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="single-blog-banner-text">
              <h3>{singleQuizOBJ.quizCategory}</h3>
              <h4>{singleQuizOBJ.quizTitle}</h4>
              <p>
                <strong>Sane Tyzer</strong>
              </p>
            </div>
          </div>

          {/* BLOG CONTENT */}
          <div className="home-divider">
            <div className="home-divider-section">
              <SingleQuizContent singleQuizOBJ={singleQuizOBJ} />
            </div>
            <div className="home-side-section">
              {/* CATEGORY SECTION */}
              <div className="home-side-section-category-container">
                <div className="home-side-section-category-header">
                  <h3>categories</h3>
                </div>
                <div className="home-side-section-category-cards">
                  <a href="/blogs/Mental Health">
                    <div className="home-side-section-category-cards-single">
                      <h3>Mental health</h3>
                      <p>{CategoryCountData.mentalhealthCount}</p>
                    </div>
                  </a>
                  <a href="/blogs/Movie Review">
                    <div className="home-side-section-category-cards-single">
                      <h3>Reel to Real</h3>
                      <p>{CategoryCountData.moviereviewCount}</p>
                    </div>
                  </a>
                </div>
              </div>
              {/* NEWSLETTER SECTION */}
              <div className="home-side-section-newsletter-container">
                <div className="home-side-section-newsletter-header">
                  <h3>Get in touch</h3>
                </div>
                <div className="home-side-section-newsletter-form">
                  <p>Drop us a message!</p>
                  <input type="text" placeholder="Your message"></input>
                  <input type="text" placeholder="Your email"></input>
                  <button>Send</button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return null;
  }
}

quizID.getInitialProps = async (ctx) => {
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

export default quizID;
