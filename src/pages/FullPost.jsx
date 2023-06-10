import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [comments, setComments] = React.useState([]);
  const [isLoadingPosts, setLoading] = React.useState(true);
  const [isLoadingComments, setLoadingComments] = React.useState(true);
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

    axios
      .get(`/comments/${id}`)
      .then((res) => {
        setComments(res.data);
        setLoadingComments(false);
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
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={[...comments]} isLoading={isLoadingComments}>
        <Index />
      </CommentsBlock>
    </>
  );
};
