import React, { Component } from "react";
import QuillNoSSRWrapper from "../Quil/Quill";
import axios from "axios";

import SingleBlogContent from "../SingleBlogContent/SingleBlogContent";

import * as firebase from "firebase/app";
import "firebase/storage";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class AdminEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventCategory: "",
      eventMainImage: "",
      eventShortDescription: "",
      eventFrom: "",
      eventTo: "",
      eventImageSuccess: false,
      eventAddedSuccess: false,
      eventDeletedSuccess: false,
      openPreview: false,
      openBackdrop: false,
      updateEvent: false,
      updatedEventID: "",
      viewForm: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onDropDownChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  inputImage = () => {
    document.getElementById("eventImage").click();
  };

  onFileUpload = (e) => {
    e.persist();
    if (e.target.files[0]) {
      this.setState({ openBackdrop: true });
      const storage = firebase.storage();

      var storageRef = storage.ref();

      var metadata = {
        contentType: "image/jpeg",
      };

      let blogImageName = "thelittlevoiceevent";

      var uploadTask = storageRef
        .child(
          blogImageName + "-mainImage-" + (this.props.allBlogsImages.length + 1)
        )
        .put(e.target.files[0], metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          //   var progress =
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("");
              break;
            default:
              console.log("");
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("no rights");
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              console.log("cancelled");
              // User canceled the upload
              break;

            case "storage/unknown":
              console.log("unknown error");
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              console.log("");
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          this.setState({ eventImageSuccess: true });
          this.setState({ openBackdrop: false });
          this.props.refreshBlogImages();
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function (downloadURL) {});
        }
      );
    } else {
      this.setState({ [e.target.id]: null });
    }
  };

  copyImageURL = (image) => {
    this.setState({
      eventMainImage: image.url,
    });
  };

  deleteimage = (image) => {
    const storage = firebase.storage();
    var storageRef = storage.ref();
    var mainImageRef = storageRef.child(image.name);
    mainImageRef
      .delete()
      .then(() => {
        this.props.refreshBlogImages();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleClose = () => {
    this.setState({ eventImageSuccess: false });
    this.setState({ eventAddedSuccess: false });
    this.setState({ eventDeletedSuccess: false });
    this.setState({ openPreview: false });
  };

  storeNewEvent = () => {
    this.setState({ openBackdrop: true });
    const body = {
      eventName: this.state.eventName,
      // eventCategory: this.state.eventCategory,
      eventMainImage: this.state.eventMainImage,
      eventFrom: this.state.eventFrom,
      eventTo: this.state.eventTo,
      eventShortDescription: this.state.eventShortDescription,
    };

    if (this.state.updateEvent) {
      body.id = this.state.updatedEventID;
      axios
        .put("/api/event?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ eventAddedSuccess: true });
            this.props.refreshEventData();
            this.setState({
              eventName: "",
              // eventCategory: "",
              eventMainImage: "",
              eventFrom: "",
              eventTo: "",
              eventShortDescription: "",
              viewForm: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    } else {
      axios
        .post("/api/event?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ eventAddedSuccess: true });
            this.props.refreshEventData();
            this.setState({
              eventName: "",
              // eventCategory: "",
              eventMainImage: "",
              eventFrom: "",
              eventTo: "",
              eventShortDescription: "",
              viewForm: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    }
  };

  editEvent = (event) => {
    this.setState({
      viewForm: true,
      updateEvent: true,
      eventName: event.eventName,
      // eventCategory: event.eventCategory,
      eventMainImage: event.eventMainImage,
      eventFrom: event.eventFrom,
      eventTo: event.eventTo,
      eventShortDescription: event.eventShortDescription,
      updatedEventID: event._id,
    });
  };

  cancelForm = () => {
    this.setState({
      viewForm: false,
      updateEvent: false,
      eventName: "",
      // eventCategory: "",
      eventMainImage: "",
      eventDate: "",
      eventTime: "",
      eventShortDescription: "",
      updatedEventID: "",
    });
  };

  addNewEvent = () => {
    this.setState({
      viewForm: true,
    });
  };

  deleteEvent = (event) => {
    if (window.confirm("Delete" + event.eventName + "?")) {
      this.setState({ openBackdrop: true });
      axios
        .delete(`/api/event?key=surya&id=${event._id}`)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ eventDeletedSuccess: true });
            this.props.refreshEventData();
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    }
  };

  render() {
    return (
      <>
        <Backdrop className="backdrop" open={this.state.openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={this.state.eventImageSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Image Uploaded.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.eventAddedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Event Uploaded.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.eventDeletedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="error"
          >
            Event Deleted.
          </MuiAlert>
        </Snackbar>

        <div className="admin-event-container">
          <div className="admin-event-view-section">
            {this.state.viewForm ? (
              <>
                <div className="admin-event-form-section">
                  <TextField
                    className="admin-event-text-filed"
                    id="eventName"
                    value={this.state.eventName}
                    label="Event Name"
                    variant="outlined"
                    onChange={this.onChange}
                  />
                  <TextField
                    className="admin-event-text-filed"
                    id="eventMainImage"
                    value={this.state.eventMainImage}
                    label="Event Image"
                    variant="outlined"
                    onChange={this.onChange}
                  />
                  <img src={this.state.eventMainImage}></img>
                  {/* <FormControl
                    variant="outlined"
                    className="admin-evebt-dropdown"
                  >
                    <InputLabel id="event-category-label">Category</InputLabel>
                    <Select
                      labelId="event-category-label"
                      name="eventCategory"
                      value={this.state.eventCategory}
                      onChange={this.onDropDownChange}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Mental Health"}>Mental Health</MenuItem>
                      <MenuItem value={"Movie Review"}>Movie Review</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
                <textarea
                  type="text"
                  placeholder="Short Description"
                  onChange={this.onChange}
                  id="eventShortDescription"
                  value={this.state.eventShortDescription}
                  className="admin-event-text-area"
                  rows={6}
                />
                <div className="admin-event-form-section">
                  <TextField
                    className="admin-event-text-filed"
                    type="date"
                    id="eventFrom"
                    value={this.state.eventFrom}
                    label="From"
                    variant="outlined"
                    onChange={this.onChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    className="admin-event-text-filed"
                    type="date"
                    id="eventTo"
                    value={this.state.eventTo}
                    label="To"
                    variant="outlined"
                    onChange={this.onChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <button className="save-blog-btn" onClick={this.storeNewEvent}>
                  Save
                </button>
                <button className="save-blog-btn" onClick={this.cancelForm}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <TableContainer component={Paper} className="admin-event-table">
                  <Table stickyHeader size="small" aria-label="blog table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">S.no</TableCell>
                        {/* <TableCell>Category</TableCell> */}
                        <TableCell>Name</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.allEventsData.map((event, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          {/* <TableCell>{event.eventCategory}</TableCell> */}
                          <TableCell>{event.eventName}</TableCell>
                          <TableCell>{event.eventFrom}</TableCell>
                          <TableCell>{event.eventTo}</TableCell>
                          <TableCell align="center">
                            <EditIcon
                              onClick={() => this.editEvent(event)}
                              className="admin-event-table-icon"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <DeleteForeverIcon
                              onClick={() => this.deleteEvent(event)}
                              className="admin-event-table-icon"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <button className="save-blog-btn" onClick={this.addNewEvent}>
                  Add New
                </button>
              </>
            )}
          </div>
          <div className="admin-event-image-section">
            <div className="admin-event-image-container">
              {this.props.allBlogsImages.map((image) => {
                if (
                  image.name
                    .toString()
                    .toLowerCase()
                    .includes("thelittlevoiceevent")
                )
                  return (
                    // <img
                    //   className="admin-event-existing-image"
                    //   src={image.url}
                    // ></img>
                    <div className="admin-event-existing-image">
                      <img
                        onClick={() => this.copyImageURL(image)}
                        src={image.url}
                      ></img>
                      <p onClick={() => this.deleteimage(image)}>X</p>
                    </div>
                  );
                else return null;
              })}
              <input
                type="file"
                id="eventImage"
                onChange={this.onFileUpload}
                style={{ display: "none" }}
              ></input>
            </div>
            <button
              className="admin-event-image-footer"
              onClick={this.inputImage}
            >
              Upload New Image
            </button>
          </div>
        </div>

        {/* <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={this.state.openPreview}
          onClose={this.handleClose}
          aria-labelledby="Preview Blog"
        >
          <DialogTitle id="Preview Blog">Event Preview</DialogTitle>
          <DialogContent>
            <SingleBlogContent blogData={this.state.blogData} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.confirmBlog} color="primary">
              Confirm
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog> */}
      </>
    );
  }
}
