import React from 'react';
import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData } from '../../redux/slices/auth';
import { createComment, fetchComments } from '../../redux/slices/comments';

export const Index = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const [comment, setComment] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await dispatch(createComment({ text: comment, postId }));
      await dispatch(fetchComments());
      setComment('');
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
