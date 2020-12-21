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

export default class AdminBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogTitle: "",
      blogCategory: "",
      blogData: "",
      blogMainImage: "",
      blogImageSuccess: false,
      blogAddedSuccess: false,
      blogDeletedSuccess: false,
      openPreview: false,
      openBackdrop: false,
      viewQuil: false,
      updateBlog: false,
      updatedBlogID: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleBlogChange = (value) => {
    this.setState({ blogData: value }, () => console.log(this.state.blogData));
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

      let blogImageName = "thelittlevoiceblog";

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
          this.setState({ blogImageSuccess: true });
          this.setState({ openBackdrop: false });
          this.props.refreshBlogImages();
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function (downloadURL) {});
        }
      );
    } else {
      this.setState({ [e.target.id]: null });
      this.setState({ blogImageURL: "" });
    }
  };

  handleClose = () => {
    this.setState({ blogImageSuccess: false });
    this.setState({ blogAddedSuccess: false });
    this.setState({ blogDeletedSuccess: false });
    this.setState({ openPreview: false });
  };

  copyImageURL = (image) => {
    this.setState({
      blogData: this.state.blogData + `<img src="${image.url}"></img>`,
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

  storeNewBlog = () => {
    this.setState({ openPreview: true });
  };

  confirmBlog = () => {
    this.setState({ openBackdrop: true });
    this.setState({ openPreview: false });
    const body = {
      blogData: this.state.blogData,
      blogTitle: this.state.blogTitle,
      blogCategory: this.state.blogCategory,
      blogMainImage: this.state.blogMainImage,
    };
    if (this.state.updateBlog) {
      body.id = this.state.updatedBlogID;
      axios
        .put("/api/blog?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ blogAddedSuccess: true });
            this.props.refreshBlogData();
            this.setState({
              blogData: "",
              blogTitle: "",
              blogMainImage: "",
              blogCategory: "",
              viewQuil: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    } else {
      axios
        .post("/api/blog?key=surya", body)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ blogAddedSuccess: true });
            this.props.refreshBlogData();
            this.setState({
              blogData: "",
              blogTitle: "",
              blogMainImage: "",
              blogCategory: "",
              viewQuil: false,
            });
          });
        })
        .catch((err) => {
          alert("Internal Server Error.");
        });
    }
  };

  editBlog = (blog) => {
    this.setState({
      viewQuil: true,
      updateBlog: true,
      blogData: blog.blogData,
      blogTitle: blog.blogTitle,
      blogMainImage: blog.blogMainImage,
      blogCategory: blog.blogCategory,
      updatedBlogID: blog._id,
    });
  };

  cancelQuil = () => {
    this.setState({
      viewQuil: false,
      updateBlog: false,
      blogData: "",
      blogTitle: "",
      blogMainImage: "",
      updatedBlogID: "",
      blogCategory: "",
    });
  };

  addNewBlog = () => {
    this.setState({
      viewQuil: true,
    });
  };

  deleteBlog = (blog) => {
    if (window.confirm("Delete " + blog.blogTitle + "?")) {
      this.setState({ openBackdrop: true });
      axios
        .delete(`/api/blog?key=surya&id=${about._id}`)
        .then((res) => {
          this.setState({ openBackdrop: false }, () => {
            this.setState({ blogDeletedSuccess: true });
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
          open={this.state.blogImageSuccess}
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
          open={this.state.blogAddedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Blog Uploaded.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.blogDeletedSuccess}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Blog Deleted.
          </MuiAlert>
        </Snackbar>

        <div className="admin-blog-container">
          <div className="admin-blog-view-section">
            {this.state.viewQuil ? (
              <>
                <input
                  className="admin-blog-text-filed"
                  id="blogTitle"
                  value={this.state.blogTitle}
                  placeholder="Blog Title"
                  variant="outlined"
                  onChange={this.onChange}
                />
                <input
                  className="admin-blog-text-filed"
                  id="blogMainImage"
                  value={this.state.blogMainImage}
                  placeholder="Blog Image"
                  variant="outlined"
                  onChange={this.onChange}
                />
                <select
                  className="admin-blog-text-filed"
                  onChange={this.onChange}
                  id="blogCategory"
                  value={this.state.blogCategory}
                >
                  <option value="">Category</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Reel to Real">Reel to Real</option>
                </select>
                <QuillNoSSRWrapper
                  onChange={(value) => this.handleBlogChange(value)}
                  value={this.state.blogData}
                  className="admin-blog-form-quil"
                />
                <button className="save-blog-btn" onClick={this.storeNewBlog}>
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
                        <TableCell align="center">S.no</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.allBlogData.map((blog, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell>{blog.blogCategory}</TableCell>
                          <TableCell>{blog.blogTitle}</TableCell>
                          <TableCell align="center">
                            <EditIcon
                              onClick={() => this.editBlog(blog)}
                              className="admin-blog-table-icon"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <DeleteForeverIcon
                              onClick={() => this.deleteBlog(blog)}
                              className="admin-blog-table-icon"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <button className="save-blog-btn" onClick={this.addNewBlog}>
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
                    .includes("thelittlevoiceblog")
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

        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={this.state.openPreview}
          onClose={this.handleClose}
          aria-labelledby="Preview Blog"
        >
          <DialogTitle id="Preview Blog">Blog Preview</DialogTitle>
          <DialogContent>
            <SingleBlogContent
              blogData={this.state.blogData}
              blogPreview={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.confirmBlog} color="primary">
              Confirm
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
