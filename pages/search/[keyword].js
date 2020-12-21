import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Host from "../../config/host";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Layout from "../../components/Layout/Layout";
import Head from "next/head";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#707070",
    color: "whitesmoke",
    maxWidth: 250,
    border: "1px solid #dadde9",
    fontFamily: "Mulish",
  },
}))(Tooltip);

function keyword({ allBlogData, allEventsData, allQuizData }) {
  const router = useRouter();
  var { keyword } = router.query;
  var originalKeyword = keyword;
  keyword = keyword.toString().toLowerCase();

  var mentalhealthNumber = 0;
  var moviereviewNumber = 0;

  allBlogData.forEach((blog) => {
    if (blog.blogCategory === "Mental Health") mentalhealthNumber++;
    else if (blog.blogCategory === "Movie Review") moviereviewNumber++;
  });

  var blogCount = 0;
  var eventCount = 0;
  var quizCount = 0;

  return (
    <>
      <Layout
        mentalhealthNumber={mentalhealthNumber}
        moviereviewNumber={moviereviewNumber}
      >
        <Head>
          <title>{"Sane Tyzer - Search Results for " + originalKeyword}</title>
        </Head>
        <div className="search-page-container">
          <h3 className="search-page-header">
            Search Results for <strong>{originalKeyword} </strong>
          </h3>
          <div className="single-category-cards-container">
            <div className="recent-posts-header single-category-section-header">
              <h3>Blogs</h3>
            </div>
            <div className="single-category-section-container">
              {allBlogData.map((blog) => {
                if (
                  blog.blogCategory
                    .toString()
                    .toLowerCase()
                    .includes(keyword) ||
                  blog.blogTitle.toString().toLowerCase().includes(keyword)
                ) {
                  blogCount++;
                  return (
                    <a
                      href={
                        "/blog/" +
                        blog.blogTitle
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
                        blog._id
                      }
                    >
                      <div className="single-category-card-single">
                        <img
                          src={blog.blogMainImage}
                          alt={blog.blogTitle}
                        ></img>
                        <div className="single-category-card-content">
                          <h3>{blog.blogCategory}</h3>
                          <h4>{blog.blogTitle}</h4>
                          <p>
                            <strong>Sane Tyzer</strong> |{" "}
                            {blog.blogDate.toString().slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                } else return null;
              })}
              {blogCount === 0 ? (
                <p className="no-search-result-text">No results</p>
              ) : null}
            </div>
            <div className="recent-posts-header single-category-section-header">
              <h3>Events</h3>
            </div>
            <div className="single-category-section-container">
              {allEventsData.map((event) => {
                if (
                  event.eventCategory
                    .toString()
                    .toLowerCase()
                    .includes(keyword) ||
                  event.eventName.toString().toLowerCase().includes(keyword)
                ) {
                  eventCount++;
                  return (
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography
                            color="inherit"
                            style={{ fontSize: "14px" }}
                          >
                            {event.eventShortDescription}
                          </Typography>
                        </React.Fragment>
                      }
                      placement="right-start"
                      arrow
                    >
                      <a
                        href="https://www.instagram.com/thelittlevoice6"
                        target="_blank"
                      >
                        <div className="single-category-card-single">
                          <img
                            src={event.eventMainImage}
                            alt={event.eventName}
                          ></img>
                          <div className="single-category-card-content">
                            <h3>{event.eventCategory}</h3>
                            <h4>{event.eventName}</h4>
                            <div className="event-card-footer">
                              <p>
                                <strong>The Little Voice</strong>
                              </p>
                              <p id="eventDuration">
                                {event.eventFrom === event.eventTo
                                  ? event.eventFrom
                                  : event.eventFrom + " to " + event.eventTo}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </HtmlTooltip>
                  );
                } else return null;
              })}
              {eventCount === 0 ? (
                <p className="no-search-result-text">No results</p>
              ) : null}
            </div>
            <div className="recent-posts-header single-category-section-header">
              <h3>Quiz</h3>
            </div>
            <div className="single-category-section-container">
              {allQuizData.map((quiz) => {
                if (
                  quiz.quizCategory
                    .toString()
                    .toLowerCase()
                    .includes(keyword) ||
                  quiz.quizTitle.toString().toLowerCase().includes(keyword)
                ) {
                  quizCount++;
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
                        <img
                          src={quiz.quizMainImage}
                          alt={quiz.quizTitle}
                        ></img>
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
                } else return null;
              })}
              {quizCount === 0 ? (
                <p className="no-search-result-text">No results</p>
              ) : null}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

keyword.getInitialProps = async (ctx) => {
  const blogResponse = await axios.get(
    `${Host}/api/blog?key=surya&demand=data`
  );
  const blogData = await blogResponse.data;

  const eventResponse = await axios.get(
    `${Host}/api/event?key=surya&demand=data`
  );
  const eventData = await eventResponse.data;

  const quizResponse = await axios.get(
    `${Host}/api/quiz?key=surya&demand=data`
  );
  const quizData = await quizResponse.data;

  return {
    allBlogData: blogData,
    allEventsData: eventData,
    allQuizData: quizData,
  };
};

export default keyword;
