import React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MovieIcon from "@material-ui/icons/Movie";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InfoIcon from "@material-ui/icons/Info";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import CloseIcon from "@material-ui/icons/Close";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import HomeIcon from "@material-ui/icons/Home";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function Navbar({ changeSection }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar-content").style.top = "75px";
      } else {
        document.getElementById("navbar-content").style.top = "-150px";
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openSearchBar = (action) => {
    document
      .querySelector(".navbar-search-bar-container")
      .classList.toggle("open");
    document.querySelector(".navbar-search-bar-input").classList.toggle("open");
    document
      .querySelector(".navbar-search-icon-container")
      .classList.toggle("open");

    if (action === "close") {
      document
        .querySelector(".navbar-search-icon-close")
        .classList.remove("open");
      document.querySelector(".navbar-search-icon").classList.remove("close");
    } else if (action === "open") {
      document.querySelector(".navbar-search-icon-close").classList.add("open");
      document.querySelector(".navbar-search-icon").classList.add("close");
    }
  };

  const openPage = (page) => {
    switch (page) {
      case "Home": {
        window.location.href = "/";
        break;
      }
      case "Mental Health": {
        window.location.href = "/blogs/Mental Health";
        break;
      }
      case "Reel to Real": {
        window.location.href = "/blogs/Reel to Real";
        break;
      }
      case "Upcoming Events": {
        window.location.href = "/events";
        break;
      }
      case "Gallery": {
        window.location.href = "/gallery";
        break;
      }
      case "About Us": {
        window.location.href = "/about";
        break;
      }
      case "Contact Us": {
        window.location.href = "/";
        break;
      }
      case "Quiz": {
        window.location.href = "/quiz";
        break;
      }
    }
  };

  React.useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);

  const searchKeyword = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      //Enter keycode
      // if(window.location.href)
      window.location.href = "/search/" + searchInput;
      // if (window.location.href.toString().toLowerCase().includes("/search/")) {
      //   console.log("on search page");
      // } else {
      //   window.location.href = "/search/" + searchInput;
      // }
    }
  };

  return (
    <>
      {/* <div className="navbar-parent"> */}
      <nav className="navbar-container">
        <span className="navbar-social-media-icons">
          {/* <a href="https://www.facebook.com/thelittlevoice6" target="_blank"> */}
          {/* <FacebookIcon className="navbar-facebook-icon" /> */}
          {/* </a> */}
          {/* <a href="https://www.facebook.com/thelittlevoice6" target="_blank"><TwitterIcon className="navbar-twitter-icon" /></a> */}
          <a href="https://www.instagram.com/sanetyzer/" target="_blank">
            <InstagramIcon className="navbar-instagram-icon" />
          </a>
        </span>
        <span className="navbar-brand-name">
          {/* <a href="/">
            <h3>The</h3>
          </a>
          <a href="/">
            <h3 id="navbar-brand-name-colored">Little Voice</h3>
          </a> */}
          <a href="/">
            <img src="/assets/logo.svg"></img>
          </a>
        </span>
        <span className="navbar-search-icon-container">
          <MenuIcon className="navbar-menu-icon" onClick={handleDrawerOpen} />
          <div className="navbar-search-bar-container">
            <SearchIcon
              className="navbar-search-icon"
              onClick={() => openSearchBar("open")}
            />
            <CloseIcon
              className="navbar-search-icon-close"
              onClick={() => openSearchBar("close")}
            />
            <input
              type="text"
              placeholder="Search for blogs, posts and much more"
              className="navbar-search-bar-input"
              value={searchInput}
              onKeyPress={searchKeyword}
              onChange={(e) => setSearchInput(e.target.value)}
            ></input>
          </div>
        </span>
      </nav>
      <nav className="navbar-content-container" id="navbar-content">
        <ul className="navbar-content-list">
          <a href="/">
            <li className="navbar-content-list-single">Home</li>
          </a>
          <a href="/blogs/Mental Health">
            <li className="navbar-content-list-single">Mental Health</li>
          </a>
          <a href="/blogs/Reel to Real">
            <li className="navbar-content-list-single">Reel to Real</li>
          </a>
          <a href="/events">
            <li className="navbar-content-list-single">Upcoming Events</li>
          </a>
          <a href="/quiz">
            <li className="navbar-content-list-single">Quiz</li>
          </a>
          <a href="/gallery">
            <li className="navbar-content-list-single">Gallery</li>
          </a>
          <a href="/about">
            <li className="navbar-content-list-single">About Us</li>
          </a>
        </ul>
        <div className="navbar-content-search-bar">
          <SearchIcon className="navbar-content-search-icon" />
          <input
            type="text"
            placeholder="Search for blogs, posts and much more"
            className="navbar-search-bar-input"
            value={searchInput}
            onKeyPress={searchKeyword}
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
        </div>
      </nav>
      {/* </div> */}

      {/* DRAWER */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            "Home",
            "Mental Health",
            "Reel to Real",
            "Upcoming Events",
            "Quiz",
          ].map((text, index) => (
            <ListItem button key={text} onClick={() => openPage(text)}>
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon className="side-bar-list-icon" />
                ) : index === 1 ? (
                  <FavoriteIcon className="side-bar-list-icon" />
                ) : index === 2 ? (
                  <MovieIcon className="side-bar-list-icon" />
                ) : index === 3 ? (
                  <EventAvailableIcon className="side-bar-list-icon" />
                ) : (
                  <QuestionAnswerIcon className="side-bar-list-icon" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Gallery", "About Us", "Contact Us"].map((text, index) => (
            <ListItem button key={text} onClick={() => openPage(text)}>
              <ListItemIcon>
                {index === 0 ? (
                  <PhotoLibraryIcon className="side-bar-list-icon" />
                ) : index === 1 ? (
                  <InfoIcon className="side-bar-list-icon" />
                ) : (
                  <ContactMailIcon className="side-bar-list-icon" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
