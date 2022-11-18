import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
// import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopular, fetchPosts, fetchTags } from '../redux/slices/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../axios"
import { UsersBlock } from '../components/UsersBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);
  const location = useLocation();
  const [tab, setTabs] = useState(0);
  const [users, setUsers] = useState([]);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = posts.status === 'loading';


  useEffect(() => {
    function fetchBusinesses() {
      if (location.pathname.indexOf('popular') === 1) {
        setTabs(1)
        dispatch(fetchPopular());
        dispatch(fetchTags());
      } else {
        setTabs(0)
        dispatch(fetchPosts());
        dispatch(fetchTags());
      }
    }
    fetchBusinesses()
  }, [dispatch, location.pathname]);

  useEffect(() => {
    axios
      .get('/auth/users')
      .then((res) => {
        setUsers(res.data)

      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      })
  }, []);


  return (
    <>

      <Tabs style={{ marginBottom: 15 }} value={tab} aria-label="basic tabs example">

        <Tab label="Новые" type='submit' onClick={() => {
          setTabs(0)
          dispatch(fetchPosts());
          dispatch(fetchTags());
          navigate('/');
        }} />


        <Tab label="Популярные" type='submit' onClick={() => {
          setTabs(1)
          dispatch(fetchPopular());
          dispatch(fetchTags());
          navigate('/popular');
        }} />

      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {
            (isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            (
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (

                <Post
                  key={index}
                  id={obj._id}
                  title={obj.title}
                  text={obj.text}
                  imageUrl={obj.imageUrl ? obj.imageUrl : ''}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.comments?.length || 0}
                  tags={obj.tags}
                  isLoading={false}
                  isEditable={userData?._id === obj.user._id}
                />
              ))
            )
            // :
            // <div style={{
            //   display: 'grid',
            //   justifyItems: 'center',
            //   alignContent: 'center',
            //   height: '50vh'
            // }}><img src="/no-results.png" height={50} width={50} /></div>
          }
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <UsersBlock users={users} />
        </Grid>
      </Grid>
    </>
  );
};
