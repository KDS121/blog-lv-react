import React, { Component } from "react";
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

export default class CategoryBlog extends Component {
  render() {
    var count = 0;
    return (
      <>
        <div className="category-container">
          <div className="category-header">
            <h3>{this.props.categoryName}</h3>
          </div>
          <div className="category-cards-container">
            {this.props.categoryName === "Upcoming Events"
              ? this.props.allEventsData.map((event, index) => {
                  if (index < 2)
                    return (
                      <HtmlTooltip
                        key={"category-blog" + index}
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
                          <div className="category-card-single">
                            <img
                              src={event.eventMainImage}
                              alt={event.eventName}
                            ></img>
                            <div className="recent-post-card-content">
                              <h4>{event.eventName}</h4>
                              <div className="event-card-footer">
                                <p>
                                  <strong>Sane Tyzer</strong>
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
                  else return null;
                })
              : this.props.allBlogData.map((blog, index) => {
                  if (blog.blogCategory === this.props.categoryName) {
                    count++;
                    if (count <= 2)
                      return (
                        <a
                          key={"category" + index}
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
                          <div className="category-card-single">
                            <img
                              src={blog.blogMainImage}
                              alt={blog.blogTitle}
                            ></img>
                            <div className="recent-post-card-content">
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
        </div>
      </>
    );
  }
}
