import React, { Component } from "react";

export default class RecentPosts extends Component {
  render() {
    return (
      <>
        <div className="recent-posts-container">
          <div className="recent-posts-header">
            <h3>Recent Posts</h3>
          </div>
          <div className="recent-posts-cards-container">
            {this.props.allBlogData.map((blog, index) => {
              if (index < 4)
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
                    key={index}
                  >
                    <div className="recent-posts-card-single">
                      <img src={blog.blogMainImage} alt={blog.blogTitle}></img>
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
              else return null;
            })}
          </div>
        </div>
      </>
    );
  }
}
