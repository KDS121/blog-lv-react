import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import Head from "next/head";
import Layout from "../components/Layout/Layout";

import Host from "../config/host";

export default class about extends Component {
  static async getInitialProps(ctx) {
    const categoryCountRes = await axios.get(
      `${Host}/api/blog?key=surya&demand=categorynumber`
    );
    const CategoryCountData = await categoryCountRes.data;

    const aboutResponse = await axios.get(
      `${Host}/api/aboutus?key=surya&demand=data`
    );
    const aboutData = await aboutResponse.data;

    return {
      CategoryCountData: CategoryCountData,
      allAboutData: aboutData,
    };
  }

  render() {
    return (
      <Layout
        mentalhealthNumber={this.props.CategoryCountData.mentalhealthCount}
        moviereviewNumber={this.props.CategoryCountData.moviereviewCount}
      >
        <Head>
          <title>About | Sane Tyzer</title>
        </Head>
        <div className="about-us-container">
          <div className="about-us-header">
            <p>About </p>
            <p id="about-us-name-first">Sane</p>
            <p id="about-us-name-second">Tyzer</p>
          </div>
          <div className="about-us-content">
            {ReactHtmlParser(this.props.allAboutData[0].aboutUsContent)}
          </div>
        </div>
      </Layout>
    );
  }
}
