import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import SingleBlogContent from "../../components/SingleBlogContent/SingleBlogContent";

import Host from "../../config/host";

function blogName({ blogData, CategoryCountData }) {
  const router = useRouter();
  const { blogName } = router.query;
  const blogID = blogName.toString().split("||")[1];

  var singleBlogOBJ = blogData.filter((blog) => blog._id === blogID);

  if (singleBlogOBJ.length > 0) {
    singleBlogOBJ = singleBlogOBJ[0];

    return (
      <>
        <Layout
          mentalhealthNumber={CategoryCountData.mentalhealthCount}
          moviereviewNumber={CategoryCountData.moviereviewCount}
        >
          <Head>
            <title>{singleBlogOBJ.blogTitle + " - Sane Tyzer"}</title>
          </Head>
          <div
            className="single-blog-banner"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${singleBlogOBJ.blogMainImage})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="single-blog-banner-text">
              <h3>{singleBlogOBJ.blogCategory}</h3>
              <h4>{singleBlogOBJ.blogTitle}</h4>
              <p>
                <strong>Sane Tyzer</strong> |{" "}
                {singleBlogOBJ.blogDate.toString().slice(0, 10)}
              </p>
            </div>
          </div>

          {/* BLOG CONTENT */}
          <div className="home-divider">
            <div className="home-divider-section">
              <SingleBlogContent
                blogData={singleBlogOBJ.blogData}
                blogobj={singleBlogOBJ}
              />
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
                  <a href="/blogs/Reel to Real">
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

blogName.getInitialProps = async (ctx) => {
  const blogResponse = await axios.get(
    `${Host}/api/blog?key=surya&demand=data`
  );
  const blogData = await blogResponse.data;

  const categoryCountRes = await axios.get(
    `${Host}/api/blog?key=surya&demand=categorynumber`
  );
  const CategoryCountData = await categoryCountRes.data;

  return {
    blogData: blogData,
    CategoryCountData: CategoryCountData,
  };
};

export default blogName;
