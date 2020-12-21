import React from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Host from "../config/host";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#707070",
    color: "whitesmoke",
    maxWidth: 250,
    border: "1px solid #dadde9",
    fontFamily: "Mulish",
  },
}))(Tooltip);

function events({ CategoryCountData, allEventsData }) {
  return (
    <>
      <Layout
        mentalhealthNumber={CategoryCountData.mentalhealthCount}
        moviereviewNumber={CategoryCountData.moviereviewCount}
      >
        <Head>
          <title>{"Events - Sane Tyzer"}</title>
        </Head>

        <div className="single-category-container">
          {/* BANNER */}
          <div
            className="single-category-banner"
            style={{
              background: `url(/assets/eventsBanner.jpg)`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h3>Upcoming Events</h3>
          </div>

          {/* OTHER CARDS */}
          <div className="event-cards-parent">
            <div className="recent-posts-header single-category-section-header">
              <h3>Events</h3>
            </div>
            <div className="event-cards-container">
              {allEventsData.map((event) => {
                return (
                  <HtmlTooltip
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
                      <div className="single-category-card-single">
                        <img
                          src={event.eventMainImage}
                          alt={event.eventName}
                        ></img>
                        <div className="single-category-card-content">
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
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

events.getInitialProps = async (ctx) => {
  const categoryCountRes = await axios.get(
    `${Host}/api/blog?key=surya&demand=categorynumber`
  );
  const CategoryCountData = await categoryCountRes.data;

  const eventResponse = await axios.get(
    `${Host}/api/event?key=surya&demand=data`
  );
  const eventData = await eventResponse.data;

  return {
    CategoryCountData: CategoryCountData,
    allEventsData: eventData,
  };
};

export default events;
