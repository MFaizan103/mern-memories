import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import PostList from "../Post-List/Post-List";
import Form from "../Form/Form";
import useStyles from "./Home-Styles";
import { useDispatch } from "react-redux";
import { getPostsAsync } from "../../StateSlices/postsListSlice";




const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAsync());
  }, []);
  return (
    <div>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justify="space-between"
          align="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <PostList />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
