import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";
import Host from "../config/host";
import jwt_decode from "jwt-decode";

// COMPONENTS
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBlog from "../components/AdminBlog/AdminBlog";
import AdminEvents from "../components/AdminEvents/AdminEvents";
import AdminQuiz from "../components/AdminQuiz/AdminQuiz";
import AdminAbout from "../components/AdminAbout/AdminAbout";
import AdminFounder from "../components/AdminFounder/AdminFounder";
import AdminLogin from "../components/AdminLogin/AdminLogin";

import firebaseConfig from "../config/firebase";
import * as firebase from "firebase/app";

export default class admin extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: true,
      allBlogsImages: [],
      allBlogData: [],
      allEventsData: [],
      allQuizData: [],
      allAboutData: [],
      allFounderData: [],
      showBlogs: true,
      showEvents: false,
      showQuiz: false,
      showAbout: false,
      showFounder: false,
      title: "Blogs",
    };
  }

  static async getInitialProps(ctx) {
    // PRODUCT DATA
    const BlogImagesRes = await axios.get(
      `${Host}/api/blog?key=surya&demand=images`
    );
    const BlogImagesData = await BlogImagesRes.data;

    BlogImagesData.sort((a, b) => {
      if (
        parseInt(a.name.toString().toLowerCase().split("-mainimage-")[1]) <
        parseInt(b.name.toString().toLowerCase().split("-mainimage-")[1])
      )
        return -1;
      else if (
        parseInt(a.name.toString().toLowerCase().split("-mainimage-")[1]) >
        parseInt(b.name.toString().toLowerCase().split("-mainimage-")[1])
      )
        return 1;
      else return 0;
    });

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

    const aboutResponse = await axios.get(
      `${Host}/api/aboutus?key=surya&demand=data`
    );
    const aboutData = await aboutResponse.data;

    const founderResponse = await axios.get(
      `${Host}/api/founder?key=surya&demand=data`
    );
    const founderData = await founderResponse.data;

    return {
      allBlogsImages: BlogImagesData,
      allBlogData: blogData,
      allEventsData: eventData,
      allQuizData: quizData,
      allAboutData: aboutData,
      allFounderData: founderData,
    };
  }

  refreshBlogImages = () => {
    axios.get("/api/blog?key=surya&demand=images").then((res) => {
      res.data.sort((a, b) => {
        if (
          parseInt(a.name.toString().toLowerCase().split("-mainimage-")[1]) <
          parseInt(b.name.toString().toLowerCase().split("-mainimage-")[1])
        )
          return -1;
        else if (
          parseInt(a.name.toString().toLowerCase().split("-mainimage-")[1]) >
          parseInt(b.name.toString().toLowerCase().split("-mainimage-")[1])
        )
          return 1;
        else return 0;
      });
      this.setState({ allBlogsImages: res.data });
    });
  };

  refreshBlogData = () => {
    axios
      .get("/api/blog?key=surya&demand=data")
      .then((res) => this.setState({ allBlogData: res.data }));
  };

  refreshEventData = () => {
    axios
      .get("/api/event?key=surya&demand=data")
      .then((res) => this.setState({ allEventsData: res.data }));
  };

  refreshQuizData = () => {
    axios
      .get("/api/quiz?key=surya&demand=data")
      .then((res) => this.setState({ allQuizData: res.data }));
  };

  refreshAboutData = () => {
    axios
      .get("/api/aboutus?key=surya&demand=data")
      .then((res) => this.setState({ allAboutData: res.data }));
  };

  refreshFounderData = () => {
    axios
      .get("/api/founder?key=surya&demand=data")
      .then((res) => this.setState({ allFounderData: res.data }));
  };

  componentDidMount = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.setState({ allBlogsImages: this.props.allBlogsImages });
    this.setState({ allBlogData: this.props.allBlogData });
    this.setState({ allEventsData: this.props.allEventsData });
    this.setState({ allQuizData: this.props.allQuizData });
    this.setState({ allAboutData: this.props.allAboutData });
    this.setState({ allFounderData: this.props.allFounderData });
    if (localStorage.atkn) {
      const token = localStorage.atkn;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      if (decoded.email === "admin@thelittlevoice.com") {
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
          // Logout user
          localStorage.removeItem("atkn");
          // Redirect to login
          this.setState({ showLogin: true });
        } else {
          this.setState({ showLogin: false });
        }
      } else {
        this.setState({ showLogin: true });
      }
    } else {
      this.setState({ showLogin: true });
    }
  };

  changeSection = (section) => {
    switch (section) {
      case "blogs": {
        this.setState({ title: "Blogs" });
        this.setState({ showBlogs: true });
        this.setState({ showEvents: false });
        this.setState({ showQuiz: false });
        this.setState({ showAbout: false });
        this.setState({ showFounder: false });
        break;
      }
      case "events": {
        this.setState({ title: "Events" });
        this.setState({ showEvents: true });
        this.setState({ showBlogs: false });
        this.setState({ showQuiz: false });
        this.setState({ showAbout: false });
        this.setState({ showFounder: false });
        break;
      }
      case "quiz": {
        this.setState({ title: "Quiz" });
        this.setState({ showEvents: false });
        this.setState({ showBlogs: false });
        this.setState({ showQuiz: true });
        this.setState({ showAbout: false });
        this.setState({ showFounder: false });
        break;
      }
      case "about": {
        this.setState({ title: "About" });
        this.setState({ showAbout: true });
        this.setState({ showEvents: false });
        this.setState({ showBlogs: false });
        this.setState({ showQuiz: false });
        this.setState({ showFounder: false });
        break;
      }
      case "founder": {
        this.setState({ title: "Founder" });
        this.setState({ showFounder: true });
        this.setState({ showAbout: false });
        this.setState({ showEvents: false });
        this.setState({ showBlogs: false });
        this.setState({ showQuiz: false });
        break;
      }
    }
  };

  checkLogin = () => {
    if (localStorage.atkn) {
      const token = localStorage.atkn;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      console.log(decoded);
      const currentTime = Date.now() / 1000; // to get in milliseconds

      if (decoded.exp < currentTime) {
        // Logout user
        localStorage.removeItem("atkn");
        // Redirect to login
        this.setState({ showLogin: true });
      } else {
        this.setState({ showLogin: false });
      }
    } else {
      this.setState({ showLogin: true });
    }
  };

  render() {
    return (
      <>
        <Head>
          <title>Sane Tyzer</title>
          <link
            href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
            rel="stylesheet"
          ></link>
          <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
        </Head>
        {this.state.showLogin ? (
          <AdminLogin checkLogin={this.checkLogin} />
        ) : (
          <>
            <AdminNavbar
              changeSection={this.changeSection}
              checkLogin={this.checkLogin}
            />
            <h3 className="admin-dashboard-header">{this.state.title}</h3>
            {this.state.showBlogs && (
              <AdminBlog
                allBlogsImages={
                  this.state.allBlogsImages.length > 0
                    ? this.state.allBlogsImages
                    : this.props.allBlogsImages
                }
                allBlogData={
                  this.state.allBlogData.length > 0
                    ? this.state.allBlogData
                    : this.props.allBlogData
                }
                refreshBlogImages={this.refreshBlogImages}
                refreshBlogData={this.refreshBlogData}
              />
            )}
            {this.state.showEvents && (
              <AdminEvents
                allBlogsImages={
                  this.state.allBlogsImages.length > 0
                    ? this.state.allBlogsImages
                    : this.props.allBlogsImages
                }
                allEventsData={
                  this.state.allEventsData.length > 0
                    ? this.state.allEventsData
                    : this.props.allEventsData
                }
                refreshBlogImages={this.refreshBlogImages}
                refreshEventData={this.refreshEventData}
              />
            )}
            {this.state.showQuiz && (
              <AdminQuiz
                allBlogsImages={
                  this.state.allBlogsImages.length > 0
                    ? this.state.allBlogsImages
                    : this.props.allBlogsImages
                }
                allQuizData={
                  this.state.allQuizData.length > 0
                    ? this.state.allQuizData
                    : this.props.allQuizData
                }
                refreshBlogImages={this.refreshBlogImages}
                refreshQuizData={this.refreshQuizData}
              />
            )}
            {this.state.showAbout && (
              <AdminAbout
                allBlogsImages={
                  this.state.allBlogsImages.length > 0
                    ? this.state.allBlogsImages
                    : this.props.allBlogsImages
                }
                allAboutData={
                  this.state.allAboutData.length > 0
                    ? this.state.allAboutData
                    : this.props.allAboutData
                }
                refreshBlogImages={this.refreshBlogImages}
                refreshAboutData={this.refreshAboutData}
              />
            )}
            {this.state.showFounder && (
              <AdminFounder
                allBlogsImages={
                  this.state.allBlogsImages.length > 0
                    ? this.state.allBlogsImages
                    : this.props.allBlogsImages
                }
                allFounderData={
                  this.state.allFounderData.length > 0
                    ? this.state.allFounderData
                    : this.props.allFounderData
                }
                refreshBlogImages={this.refreshBlogImages}
                refreshFounderData={this.refreshFounderData}
              />
            )}
          </>
        )}
      </>
    );
  }
}
