import React, { useState, useEffect } from "react";
import useStyles from "./Form-Styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostsAsync,
  updatePostAsync,
} from "../../StateSlices/postsListSlice";
import { setCurrentID } from "../../StateSlices/idSlice";

const Form = () => {
  const currentID = useSelector((state) => state.idState.id);
  const post = useSelector((state) =>
    currentID ? state.postsList.find((p) => p._id === currentID) : null
  );

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();
  const classes = useStyles();
  const userName = JSON.parse(localStorage.getItem("profile"));
  // Refilling The Form

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  // Refilling The Form //

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentID !== 0) {
      dispatch(
        updatePostAsync(currentID, {
          ...postData,
          name: userName?.result?.name,
        })
      );
      clear();
    } else {
      dispatch(
        createPostsAsync({
          ...postData,
          name: userName?.result?.name,
        })
      );
      clear();
    }
  };

  const clear = () => {
    dispatch(setCurrentID(0));
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  if (!userName?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to create your memories and like other's memories
        </Typography>
      </Paper>
    );
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <form
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentID ? "Editing" : "Creating"} a Memory
          </Typography>
          <TextField
            name="title"
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
            variant="outlined"
            label="Title"
            fullWidth
          />
          <TextField
            name="message"
            value={postData.message}
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
            variant="outlined"
            label="Message"
            fullWidth
          />
          <TextField
            name="tags"
            value={postData.tags}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(",") });
            }}
            variant="outlined"
            label="Tags"
            fullWidth
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, selectedFile: base64 });
              }}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
