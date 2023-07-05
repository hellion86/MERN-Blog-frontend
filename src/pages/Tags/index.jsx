import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Post } from "../../components";
import axios from "../../axios";
import styles from "./Tags.module.scss";

export const Tags = () => {
  const { tagName } = useParams();
  const [data, setData] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.data);
  React.useEffect(() => {
    axios
      .get(`/tags/${tagName}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Paper elevation={0} style={{ padding: 30 }}>
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          value={`# ${tagName}`}
          fullWidth
        />

        <Grid xs={8} item>
          {(isLoading ? [...Array(3)] : data).map((obj, index) =>
            isLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                key={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `${process.env.REACT_API_BACKEND_URL}${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                isLoading={isLoading}
              />
            )
          )}
        </Grid>
      </Paper>
    </>
  );
};
