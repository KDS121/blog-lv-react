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

export default function AdminNavbar({ changeSection, checkLogin }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("atkn");
    checkLogin();
  };

  //   const openSearchBar = (action) => {
  //     document
  //       .querySelector(".navbar-search-bar-container")
  //       .classList.toggle("open");
  //     document.querySelector(".navbar-search-bar-input").classList.toggle("open");
  //     document
  //       .querySelector(".navbar-search-icon-container")
  //       .classList.toggle("open");

  //     if (action === "close") {
  //       document
  //         .querySelector(".navbar-search-icon-close")
  //         .classList.remove("open");
  //       document.querySelector(".navbar-search-icon").classList.remove("close");
  //     } else if (action === "open") {
  //       document.querySelector(".navbar-search-icon-close").classList.add("open");
  //       document.querySelector(".navbar-search-icon").classList.add("close");
  //     }
  //   };

  return (
    <>
      <nav className="navbar-container">
        <span className="navbar-social-media-icons">
          <h3>Admin</h3>
        </span>
        <span className="navbar-brand-name">
          <img
            style={{
              width: "100px",
            }}
            src="/assets/logo.svg"
          ></img>
        </span>
        <span className="navbar-logout-button">
          <button onClick={logoutAdmin}>Logout</button>
        </span>
      </nav>
      <nav className="navbar-content-container">
        <ul className="navbar-content-list">
          <li
            className="navbar-content-list-single"
            onClick={() => changeSection("blogs")}
          >
            Blogs
          </li>
          <li
            className="navbar-content-list-single"
            onClick={() => changeSection("quiz")}
          >
            Quiz
          </li>
          <li
            className="navbar-content-list-single"
            onClick={() => changeSection("events")}
          >
            Events
          </li>
          <li
            className="navbar-content-list-single"
            onClick={() => changeSection("about")}
          >
            About
          </li>
          <li
            className="navbar-content-list-single"
            onClick={() => changeSection("founder")}
          >
            Founder
          </li>
        </ul>
      </nav>

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
          {["Mental Health", "Movies", "Upcoming Events"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? (
                  <FavoriteIcon className="side-bar-list-icon" />
                ) : index === 1 ? (
                  <MovieIcon className="side-bar-list-icon" />
                ) : (
                  <EventAvailableIcon className="side-bar-list-icon" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Gallery", "About Us", "Contact Us"].map((text, index) => (
            <ListItem button key={text}>
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
