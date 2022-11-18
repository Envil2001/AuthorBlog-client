import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchGetByTag, fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  text,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  likeCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить стать?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  var date = new Date(createdAt);
  const d = new Date(createdAt);
  date = d.toDateString();

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <UserInfo {...user} additionalText={date} />
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <div className={clsx(styles.image, { [styles.imageFull]: isFullPost })} style={{ backgroundImage: `url(https://envil-blog-mern.herokuapp.com/uploads/${imageUrl})` }}></div>
      )}
      <div className={styles.wrapper}>

        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>

          <ul className={styles.tags}>
            {tags?.map((name) => name && (
              <li key={name}>
                <Link to={`/tags/${name}`}
                  onClick={() => {
                    dispatch(fetchGetByTag(name));
                  }}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
