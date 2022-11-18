import React from "react";

import { Post } from "../components/Post";

import { CommentsBlock } from "../components/CommentsBlock";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ReactMarkown from "react-markdown";
import axios from "../axios"
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPostComments } from "../redux/slices/comment";
import { Avatar, Button, TextField } from "@mui/material";
import styles from "../components/AddComment/AddComment.module.scss";
import { useCallback } from "react";
import { selectIsAuth } from "../redux/slices/auth";


export const FullPost = () => {
  const userData = useSelector(state => state.auth.data);
  const { comments } = useSelector((state) => state.comment)

  const isAuth = useSelector(selectIsAuth);
  const [comment, setComment] = useState('');
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const params = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    axios
      .get(`/posts/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      })
  }, [id]);

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('');
      
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])


  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }


  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments?.length || 0}
        likeCount={data.likeCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkown children={data.text} />
      </Post>

      <CommentsBlock
        items={comments}
        isLoading={isLoading}
      >
        <form className={styles.root} onSubmit={e => e.preventDefault()}>
          {isAuth ? (
            <>
              <Avatar
                classes={{ root: styles.avatar }}
                src={userData.avatarUrl ? `https://envil-blog-mern.herokuapp.com/uploads/'${userData.avatarUrl}` : '/noavatar.png'}
              />
              <div className={styles.form}>
                <TextField
                  label="Написать комментарий"
                  variant="outlined"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  maxRows={10}
                  multiline
                  fullWidth
                />
                <Button type="submit" onClick={handleSubmit} variant="contained" sx={{borderRadius: "10px"}}>Отправить</Button>
              </div>
            </>
          ) :
            <Link to="/login">
              <Button variant="outlined">Войти</Button>
            </Link>
          }

        </form>
        
      </CommentsBlock>
    </>
  );
};
