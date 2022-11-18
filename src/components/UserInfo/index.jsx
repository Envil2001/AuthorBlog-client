import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, additionalText, _id }) => {

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl ? `https://envil-blog-mern.herokuapp.com/uploads/' ${avatarUrl}` : '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <Link to={`/user/${_id}`} className={styles.userName}>{fullName}</Link>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};