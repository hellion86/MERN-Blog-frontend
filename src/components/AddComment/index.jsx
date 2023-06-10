import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData } from '../../redux/slices/auth';
import { createComment } from '../../redux/slices/comments';

import axios from '../../axios.js';

export const Index = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const [comment, setComment] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  // console.log(user);
  // TODO: Если пользователь не авторизован, не показывать окно ввода комментариев

  const handleSubmitPost = async () => {
    // try {
    //   setLoading(true);
    //   const fields = { title, text, tags, imageUrl };
    //   const { data } = isEditing
    //     ? await axios.patch(`/posts/${id}`, fields)
    //     : await axios.post('/posts', fields);
    //   const _id = isEditing ? id : data._id;
    //   navigate(`/posts/${_id}`);
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    //   alert('Не удалось опубликовать пост');
    // }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = { text: comment, postId };
      // await axios.post('comments', data);
      dispatch(createComment(data));
      setComment('');
      // "text": "комментарий для тестов",
      // "postId": "64590edc2d7cb4fb9476e7df"
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('Не удалось опубликовать комментарий, попробуйте позже.');
      setLoading(false);
    }
  };

  if (!user) {
    return;
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={user ? user.avatarUrl : ''}
          // src={''}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading}
          >
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
