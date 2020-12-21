import React, { Component } from "react";

export default class Hero extends Component {
  render() {
    return (
      <>
        <div className="home-hero-container">
          <div className="home-hero-main-container">
            <span
              className="home-hero-banner-span"
              onClick={() =>
                (window.location.href = this.props.allBlogData[0]
                  ? "/blog/" +
                    this.props.allBlogData[0].blogTitle
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
                    this.props.allBlogData[0]._id
                  : "/")
              }
            >
              <img
                id="home-banner-1"
                src={this.props.allBlogData[0]?.blogMainImage}
                alt={this.props.allBlogData[0]?.blogTitle}
              ></img>
              <div
                className="home-hero-banner-text"
                id="home-hero-banner-text-1"
              >
                <h3>{this.props.allBlogData[0]?.blogCategory}</h3>
                <h4>{this.props.allBlogData[0]?.blogTitle}</h4>
                <p>
                  <strong>Sane Tyzer</strong> |{" "}
                  {this.props.allBlogData[0]?.blogDate.toString().slice(0, 10)}
                </p>
              </div>
            </span>
          </div>
          <div className="home-hero-side-container">
            <span
              className="home-hero-side-banner-span"
              onClick={() =>
                (window.location.href = this.props.allBlogData[1]
                  ? "/blog/" +
                    this.props.allBlogData[1].blogTitle
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
                    this.props.allBlogData[1]._id
                  : "/")
              }
            >
              <img
                id="home-banner-2"
                src={this.props.allBlogData[1]?.blogMainImage}
                alt={this.props.allBlogData[1]?.blogTitle}
              ></img>
              <div className="home-hero-banner-text">
                <h3>{this.props.allBlogData[1]?.blogCategory}</h3>
                <h4>{this.props.allBlogData[1]?.blogTitle}</h4>
                <p>
                  <strong>Sane Tyzer</strong> |{" "}
                  {this.props.allBlogData[1]?.blogDate.toString().slice(0, 10)}
                </p>
              </div>
            </span>

            <span
              className="home-hero-side-banner-span"
              onClick={() =>
                (window.location.href = this.props.allBlogData[2]
                  ? "/blog/" +
                    this.props.allBlogData[2].blogTitle
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
                    this.props.allBlogData[2]._id
                  : "/")
              }
            >
              <img
                id="home-banner-3"
                src={this.props.allBlogData[2]?.blogMainImage}
                alt={this.props.allBlogData[2]?.blogTitle}
              ></img>
              <div className="home-hero-banner-text">
                <h3>{this.props.allBlogData[2]?.blogCategory}</h3>
                <h4>{this.props.allBlogData[2]?.blogTitle}</h4>
                <p>
                  <strong>Sane Tyzer</strong> |{" "}
                  {this.props.allBlogData[2]?.blogDate.toString().slice(0, 10)}
                </p>
              </div>
            </span>
          </div>
        </div>
      </>
    );
  }
}
