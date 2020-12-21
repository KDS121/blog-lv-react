import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

import Host from "../../config/host";

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#707070",
    color: "whitesmoke",
    maxWidth: 250,
    border: "1px solid #dadde9",
    fontFamily: "Mulish",
  },
}))(Tooltip);

function category({ blogData, CategoryCountData, allEventsData }) {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <Layout
        mentalhealthNumber={CategoryCountData.mentalhealthCount}
        moviereviewNumber={CategoryCountData.moviereviewCount}
      >
        <Head>
          <title>{category + " Blogs - Sane Tyzer"}</title>
        </Head>

        <div className="single-category-container">
          {/* BANNER */}
          <div
            className="single-category-banner"
            style={{
              background: `url(${
                category === "Mental Health"
                  ? "/assets/mentalHealthBanner.jpg"
                  : "/assets/moviereview.jpg"
              })`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h3>{category}</h3>
          </div>

          {/* OTHER CARDS */}
          <div className="single-category-cards-container">
            <div className="recent-posts-header single-category-section-header">
              <h3>Blogs</h3>
            </div>
            <div className="single-category-section-container">
              {blogData.map((blog) => {
                if (blog.blogCategory === category) {
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
                }
              })}
            </div>
            {/* <div className="recent-posts-header single-category-section-header">
              <h3>Events</h3>
            </div>
            <div className="single-category-section-container">
              {allEventsData.map((event) => {
                if (event.eventCategory === category) {
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
                }
              })}
            </div>
            <div className="recent-posts-header single-category-section-header">
              <h3>Quiz</h3>
            </div> */}
            {/* <div className="single-category-section-container">
              {blogData.map((blog) => {
                if (blog.blogCategory === category) {
                  return (
                    <a
                      href={
                        "/blog/" +
                        blog.blogTitle.toString().replace("&", "and") +
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
                            <strong>The Little Voice</strong> |{" "}
                            {blog.blogDate.toString().slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                }
              })}
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
}

category.getInitialProps = async (ctx) => {
  const blogResponse = await axios.get(
    `${Host}/api/blog?key=surya&demand=data`
  );
  const blogData = await blogResponse.data;

  const categoryCountRes = await axios.get(
    `${Host}/api/blog?key=surya&demand=categorynumber`
  );
  const CategoryCountData = await categoryCountRes.data;

  const eventResponse = await axios.get(
    `${Host}/api/event?key=surya&demand=data`
  );
  const eventData = await eventResponse.data;

  return {
    blogData: blogData,
    CategoryCountData: CategoryCountData,
    allEventsData: eventData,
  };
};

export default category;
