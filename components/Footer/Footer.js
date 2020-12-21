import React, { Component } from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

export default class Footer extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
    };
  }

  submitNewletter = () => {
    const body = {
      email: this.state.email,
      name: this.state.name,
    };
    console.log(body);
  };

  render() {
    return (
      <>
        <div
          className={
            this.props.galleryfooter
              ? "footer-container gallery-footer-container"
              : "footer-container"
          }
        >
          <div className="footer-section">
            <span className="navbar-brand-name footer-brand-name">
              <img src="/assets/logo.svg"></img>
            </span>
            <p>
              Nec feugiat nisl pretium fusce id velit ut tortor pretium. Nisl
              purus in mollis nunc sed. Nunc non blandit massa enim nec.
            </p>
            <div className="home-side-section-social-media-cards footer-social-media-cards">
              {/* <div className="home-side-section-social-media-card-single footer-social-media-card-single"> */}
              {/* <a
                  href="https://www.facebook.com/thelittlevoice6"
                  target="_blank"
                > */}
              {/* <FacebookIcon className="home-side-section-social-media-card-icon footer-social-media-card-icon" /> */}
              {/* </a> */}
              {/* </div> */}
              {/* <div className="home-side-section-social-media-card-single footer-social-media-card-single">
                <TwitterIcon className="home-side-section-social-media-card-icon footer-social-media-card-icon" />
              </div> */}
              <div className="home-side-section-social-media-card-single footer-social-media-card-single">
                <a href="https://www.instagram.com/sanetyzer/" target="_blank">
                  <InstagramIcon className="home-side-section-social-media-card-icon footer-social-media-card-icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <div className="home-side-section-category-container footer-category-container">
              <div className="home-side-section-category-header footer-category-header">
                <h3>categories</h3>
              </div>
              <div className="home-side-section-category-cards">
                <a href="/blogs/Mental Health">
                  <div className="home-side-section-category-cards-single footer-category-card-single">
                    <h3>Mental health</h3>
                    <p>{this.props.mentalhealthNumber}</p>
                  </div>
                </a>
                <a href="/blogs/Reel to Real">
                  <div className="home-side-section-category-cards-single footer-category-card-single">
                    <h3>Reel to Real</h3>
                    <p>{this.props.moviereviewNumber}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <div className="home-side-section-newsletter-container footer-newsletter-container">
              <div className="home-side-section-newsletter-header footer-newsletter-header">
                <h3>Newsletter</h3>
              </div>
              <div className="home-side-section-newsletter-form footer-newsletter-form">
                <p>Subscribe to us for latest updates!</p>
                <input type="text" placeholder="Your Name"></input>
                <input type="text" placeholder="Your email"></input>
                <button onClick={this.submitNewletter}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
