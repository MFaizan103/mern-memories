import React, { useState } from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import useStyles from "./Post-List-Styles";

const PostList = () => {
  const classes = useStyles();
  const postsList = useSelector((state) => state.postsList.data);
  const isloading = useSelector((state) => state.postsList.isloading);
  console.log(postsList);
  console.log(isloading);
  if (isloading) {
    return <CircularProgress />;
  } else {
    return (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {postsList.length === 0 ? (
          <Typography variant="h3" align="center" >
            No Posts to Display
          </Typography>
        ) : (
          postsList.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} />
            </Grid>
          ))
        )}
      </Grid>
    );
  }
};

export default PostList;
