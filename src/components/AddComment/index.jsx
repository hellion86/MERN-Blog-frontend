import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData } from '../../redux/slices/auth';

export const Index = () => {
  const user = useSelector(selectUserData);
  console.log(user);
  // TODO: Если пользователь не авторизован, не показывать окно ввода комментариев

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
          />
          <Button variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
