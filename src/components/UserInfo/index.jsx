import React from 'react';
import styles from './UserInfo.module.scss';

import userAvatar from '../../assets/img/user-avatar.svg';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const date = new Date(additionalText);
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        // TODO: fix avatarUrl
        src={userAvatar}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{date.toLocaleDateString()}</span>
      </div>
    </div>
  );
};
