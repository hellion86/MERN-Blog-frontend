import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useSelector } from "react-redux";

import axios from "../axios";

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const { comments } = useSelector((state) => state.comments);
  const isCommentsLoading = comments.status === "loading";
  const commentsByPostId = comments.items.filter(
    (item) => item.post._id === id
  );
  const [isLoadingPosts, setLoading] = React.useState(true);
  // TODO: dont load comments when hit F5
  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingPosts) {
    return <Post isLoading={isLoadingPosts} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `${process.env.REACT_APP_API_BACKEND_URL}${data.imageUrl}`
            : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={commentsByPostId} isLoading={isCommentsLoading}>
        <Index postId={id} />
      </CommentsBlock>
    </>
  );
};
