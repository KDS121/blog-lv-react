import React, { Component } from "react";
import QuillNoSSRWrapper from "../Quil/Quill";
import axios from "axios";

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

export default class AdminBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUsContent: "",
      aboutImageSuccess: false,
      aboutAddedSuccess: false,
      openPreview: false,
      openBackdrop: false,
      viewQuil: false,
      updateAboutUs: false,
      aboutUsDeletedSuccess: false,
      updatedAboutUsID: "",
    };
  }

  handleAboutUsChange = (value) => {
    this.setState({ aboutUsContent: value });
  };

  inputImage = () => {
    document.getElementById("blogImage").click();
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

      let blogImageName = "thelittlevoiceabout";

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
          this.setState({ aboutImageSuccess: true });
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

  handleClose = () => {
    this.setState({ aboutImageSuccess: false });
    this.setState({ aboutAddedSuccess: false });
    this.setState({ openPreview: false });
    this.setState({ aboutUsDeletedSuccess: false });
  };

  copyImageURL = (image) => {
    this.setState({
      aboutUsContent:
        this.state.aboutUsContent + `<img src="${image.url}"></img>`,
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

  storeNewAboutUs = () => {
    this.setState({ openPreview: true });
    this.confirmBlog();
  };

  confirmBlog = () => {
    this.setState({ openBackdrop: true });
    this.setState({ openPreview: false });
    const body = {
      aboutUsContent: this.state.aboutUsContent,
    };
    if (this.state.updateAboutUs) {
      body.id = this.state.updatedAboutUsID;
      axios
        .put("/api/aboutus?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ aboutAddedSuccess: true });
            this.props.refreshAboutData();
            this.setState({
              aboutUsContent: "",
              viewQuil: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    } else {
      axios
        .post("/api/aboutus?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ aboutAddedSuccess: true });
            this.props.refreshAboutData();
            this.setState({
              aboutUsContent: "",
              viewQuil: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    }
  };

  editAbout = (about) => {
    this.setState({
      viewQuil: true,
      updateAboutUs: true,
      aboutUsContent: about.aboutUsContent,
      updatedAboutUsID: about._id,
    });
  };

  cancelQuil = () => {
    this.setState({
      viewQuil: false,
      updateAboutUs: false,
      aboutUsContent: "",
      updatedAboutUsID: "",
    });
  };

  addNewAboutUs = () => {
    this.editAbout(this.props.allAboutData[0]);
  };

  deleteAboutUs = (about) => {
    if (window.confirm("Delete about us content?")) {
      this.setState({ openBackdrop: true });
      axios
        .delete(`/api/aboutus?key=surya&id=${about._id}`)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ aboutUsDeletedSuccess: true });
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
          open={this.state.aboutImageSuccess}
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
          open={this.state.aboutAddedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            About Us Uploaded.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.aboutUsDeletedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            About Us Deleted.
          </MuiAlert>
        </Snackbar>

        <div className="admin-blog-container">
          <div className="admin-blog-view-section">
            {this.state.viewQuil ? (
              <>
                <QuillNoSSRWrapper
                  onChange={(value) => this.handleAboutUsChange(value)}
                  value={this.state.aboutUsContent}
                  className="admin-blog-form-quil"
                />
                <button
                  className="save-blog-btn"
                  onClick={this.storeNewAboutUs}
                >
                  Save
                </button>
                <button className="save-blog-btn" onClick={this.cancelQuil}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <TableContainer component={Paper} className="admin-blog-table">
                  <Table stickyHeader size="small" aria-label="blog table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">S.no</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.allAboutData.map((about, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>About Us</TableCell>
                          <TableCell align="right">
                            <EditIcon
                              onClick={() => this.editAbout(about)}
                              className="admin-blog-table-icon"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <DeleteForeverIcon
                              onClick={() => this.deleteAboutUs(about)}
                              className="admin-blog-table-icon"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <button className="save-blog-btn" onClick={this.addNewAboutUs}>
                  Add New
                </button>
              </>
            )}
          </div>
          <div className="admin-blog-image-section">
            <div className="admin-blog-image-container">
              {this.props.allBlogsImages.map((image) => {
                if (
                  image.name
                    .toString()
                    .toLowerCase()
                    .includes("thelittlevoiceabout")
                )
                  return (
                    <div className="admin-blog-existing-image">
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
                id="blogImage"
                onChange={this.onFileUpload}
                style={{ display: "none" }}
              ></input>
            </div>
            <button
              className="admin-blog-image-footer"
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
          <DialogTitle id="Preview Blog">Blog Preview</DialogTitle>
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
