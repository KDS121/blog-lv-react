import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import Category from "../components/CategoryBlogs/CategoryBlog";
import Quiz from "../components/QuizCards/QuizCards";
import ReactHtmlParser from "react-html-parser";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import Host from "../config/host";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      newsletterSuccess: false,
      newsletterError: false,
      openBackdrop: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  static async getInitialProps(ctx) {
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

    const founderResponse = await axios.get(
      `${Host}/api/founder?key=surya&demand=data`
    );
    const founderData = await founderResponse.data;

    return {
      allBlogData: blogData,
      allEventsData: eventData,
      allQuizData: quizData,
      allFounderData: founderData,
    };
  }

  submitNewletter = () => {
    this.setState({ openBackdrop: true });
    const body = {
      email: this.state.email,
      name: this.state.name,
    };
    axios
      .post("/api/newsletter?key=surya", body)
      .then((res) => {
        this.setState({ openBackdrop: false }, () => {
          this.setState({ newsletterSuccess: true });
        });
      })
      .catch((err) => {
        this.setState({ newsletterError: true });
      });
  };

  handleClose = () => {
    this.setState({ newsletterSuccess: false });
    this.setState({ newsletterError: false });
  };

  render() {
    var mentalhealthNumber = 0;
    var moviereviewNumber = 0;
    this.props.allBlogData.forEach((blog) => {
      if (blog.blogCategory === "Mental Health") mentalhealthNumber++;
      else if (blog.blogCategory === "Reel to Real") moviereviewNumber++;
    });
    return (
      <>
        <Backdrop className="backdrop" open={this.state.openBackdrop}>
          <CircularProgress color="#FF485A" />
        </Backdrop>

        <Snackbar
          open={this.state.newsletterSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Welcome to the community!
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.newsletterError}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="error"
          >
            Unable to subscribe. Please try again later.
          </MuiAlert>
        </Snackbar>

        <Layout
          mentalhealthNumber={mentalhealthNumber}
          moviereviewNumber={moviereviewNumber}
        >
          <Head>
            <title>Sane Tyzer</title>
          </Head>
          <Hero allBlogData={this.props.allBlogData} />
          <div className="home-divider">
            <div className="home-divider-section">
              <RecentPosts allBlogData={this.props.allBlogData} />
            </div>
            <div className="home-side-section">
              {/* SOCIAL MEDIA SECTION */}
              <div className="home-side-section-social-media-container">
                <div className="home-side-section-social-media-header">
                  <h3>From the Founder</h3>
                </div>
                <div className="home-side-section-founder-content">
                  <img src={this.props.allFounderData[0].FounderImageURL}></img>
                  <div className="home-side-section-founder-content-text">
                    <h3 className="home-side-section-founder-name">
                      {this.props.allFounderData[0].FounderName}
                    </h3>
                    {ReactHtmlParser(
                      this.props.allFounderData[0].FounderContent
                    )}
                  </div>
                </div>
                {/* <div className="home-side-section-social-media-cards">
                  <div className="home-side-section-social-media-card-single">
                    <a
                      href="https://www.facebook.com/thelittlevoice6"
                      target="_blank"
                    >
                    <FacebookIcon className="home-side-section-social-media-card-icon" />
                    </a>
                  </div>
                  <div className="home-side-section-social-media-card-single">
                    <TwitterIcon className="home-side-section-social-media-card-icon" />
                  </div>
                  <div className="home-side-section-social-media-card-single">
                    <a
                      href="https://www.instagram.com/thelittlevoice6/"
                      target="_blank"
                    >
                      <InstagramIcon className="home-side-section-social-media-card-icon" />
                    </a>
                  </div>
                </div> */}
              </div>
              {/* CATEGORY SECTION */}
              <div className="home-side-section-category-container">
                <div className="home-side-section-category-header">
                  <h3>categories</h3>
                </div>
                <div className="home-side-section-category-cards">
                  <a href="/blogs/Mental Health">
                    <div className="home-side-section-category-cards-single">
                      <h3>Mental health</h3>
                      <p>{mentalhealthNumber}</p>
                    </div>
                  </a>
                  <a href="/blogs/Reel to Real">
                    <div className="home-side-section-category-cards-single">
                      <h3>Reel to Real</h3>
                      <p>{moviereviewNumber}</p>
                    </div>
                  </a>
                </div>
              </div>
              {/* NEWSLETTER SECTION */}
              <div className="home-side-section-newsletter-container">
                <div className="home-side-section-newsletter-header">
                  <h3>Newsletter</h3>
                </div>
                <div className="home-side-section-newsletter-form">
                  <p>Subscribe to us for latest updates!</p>
                  <input
                    type="text"
                    id="name"
                    value={this.state.name}
                    placeholder="Your Name"
                    onChange={this.onChange}
                  ></input>
                  <input
                    type="text"
                    id="email"
                    value={this.state.email}
                    placeholder="Your email"
                    onChange={this.onChange}
                  ></input>
                  <button onClick={this.submitNewletter}>Submit</button>
                </div>
              </div>
            </div>
          </div>
          {/* RANDOM QUOTES SECTION */}
          <div className="random-quote-container">
            <h3>
              Don’t be afraid to give up the <strong>good</strong> to go for the{" "}
              <strong>great</strong>.
            </h3>
          </div>

          <div className="home-category-container">
            <Category
              categoryName="Mental Health"
              allBlogData={this.props.allBlogData}
            />
            <Category
              categoryName="Reel to Real"
              allBlogData={this.props.allBlogData}
            />
            {this.props.allEventsData.length > 0 ? (
              <Category
                categoryName="Upcoming Events"
                allEventsData={this.props.allEventsData}
              />
            ) : null}
          </div>

          {/* RANDOM QUOTES SECTION */}
          <div
            className="random-quote-container"
            style={{ backgroundImage: "url(/assets/quoteBackground2.jpg)" }}
          >
            <h3>
              Work hard, be kind, and amazing things will{" "}
              <strong>happen</strong>.
            </h3>
          </div>

          <div className="home-quiz-container">
            <Quiz allQuizData={this.props.allQuizData} />
          </div>
        </Layout>
      </>
    );
  }
}
