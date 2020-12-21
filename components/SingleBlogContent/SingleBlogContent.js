import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { FacebookShareButton } from "react-share";

export default class SingleBlogContent extends Component {
  state = {
    pageURL: "",
  };

  componentDidMount = () => {
    this.setState({ pageURL: window.location.href });
  };
  render() {
    return (
      <>
        <div className="single-blog-content-container">
          {this.props.blogPreview ? null : (
            <div className="single-blog-share-section">
              <FacebookShareButton
                url={this.state.pageURL.toString()}
                quote={
                  this.props.blogobj.blogTitle
                    .toString()
                    .split("&")
                    .join("and") + " | Sane Tyzer"
                }
                // hashtag="#thelittlevoice"
                style={{ outline: "none" }}
              >
                <span className="single-blog-share-section-facebook">
                  <FacebookIcon className="single-blog-share-icon" />
                  {/* <p>|</p> */}
                  <h4>share</h4>
                </span>
              </FacebookShareButton>

              <span
                className="single-blog-share-section-twitter"
                onClick={() =>
                  window.open(
                    "https://api.whatsapp.com/send?text=" +
                      this.props.blogobj.blogTitle
                        .toString()
                        .split("&")
                        .join("and") +
                      " | Sane Tyzer " +
                      window.location.href
                  )
                }
              >
                <WhatsAppIcon className="single-blog-share-icon" />
                {/* <p>|</p> */}
                <h4>share</h4>
              </span>
            </div>
          )}

          {/* blog content */}
          <div className="single-blog-main-content">
            {ReactHtmlParser(this.props.blogData)}
            <div id="editor"></div>
          </div>
        </div>
      </>
    );
  }
}
