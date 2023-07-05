import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchTags, fetchPostsByType } from "../redux/slices/posts";
import { fetchComments } from "../redux/slices/comments";

export const Home = () => {
  const dispatch = useDispatch();
  const [currentTab, setTab] = useState("new");
  const { posts, tags } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";
  const handleTabs = () => {
    if (currentTab === "new") {
      setTab("popular");
      dispatch(fetchPostsByType("popular"));
    } else {
      setTab("new");
      dispatch(fetchPostsByType("new"));
    }
  };
  React.useEffect(() => {
    dispatch(fetchPostsByType(currentTab));
    dispatch(fetchTags());
    dispatch(fetchComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={currentTab}
        onChange={handleTabs}
        aria-label="basic tabs example"
      >
        <Tab value="new" label="Новые" />
        <Tab value="popular" label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
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
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                isLoading={isPostsLoading}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
