import React, { Component } from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Host from "../config/host";
// import InstagramEmbed from "react-instagram-embed";
import InstagramFeed from "instafeed";

// https://www.instagram.com/thelittlevoice6/

export default class gallery extends Component {
  static async getInitialProps(ctx) {
    const CategoryCountResponse = await axios.get(
      `${Host}/api/blog?key=surya&demand=categorynumber`
    );
    const categoryCountData = await CategoryCountResponse.data;

    return {
      categoryCountData: categoryCountData,
    };
  }

  componentDidMount = () => {
    new InstagramFeed({
      username: "sanetyzer",
      container: document.getElementById("gallery-container"),
      display_profile: true,
      display_biography: true,
      display_gallery: true,
      display_igtv: true,
      callback: null,
      styling: true,
      items: 12,
      items_per_row: 3,
      margin: 1,
      lazy_load: true,
      on_error: console.error,
    });
    setTimeout(() => {
      document.querySelector(".loading-svg").classList.add("closeLoading");
    }, 800);
  };

  render() {
    return (
      <>
        <Layout
          mentalhealthNumber={this.props.categoryCountData.mentalhealthCount}
          moviereviewNumber={this.props.categoryCountData.moviereviewCount}
          galleryfooter={true}
        >
          <Head>
            <title>Gallery - Sane Tyzer</title>
          </Head>

          <img className="loading-svg" src="/assets/loading.svg"></img>

          <div className="gallery-container" id="gallery-container"></div>
        </Layout>
      </>
    );
  }
}
