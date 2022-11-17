import { Grid, List, ListItem, ListItemButton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import axios from "../../axios"
import { Post } from "../../components/Post";
import { PostSkeleton } from "../../components/Post/Skeleton";
import { SideBlock } from "../../components/SideBlock";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import { UserProfileSkeleton } from "../../components/UserProfile/UserProfileSkeleton";
import { fetchPosts } from "../../redux/slices/posts";

export const User = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const { posts } = useSelector(state => state.posts);

    const isPostsLoading = posts.status === 'loading';



    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        axios
            .get(`/auth/user/${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.warn(err);
                alert('Ошибка при получении user(a)');
            })
    }, [id]);


    if (isLoading) {
        return (
            <>
                <UserProfileSkeleton />
                <PostSkeleton />
            </>
        )
    }

    var postsData = posts.items.filter(obj => obj.user._id === data._id);
    let sumComment = 0;
    for (let key in postsData) {
        sumComment += +postsData[key].comments.length;
    }

    let sumTags = 0;
    for (let key in postsData) {
        if (postsData[key].tags !== '') {
            sumTags += +postsData[key].tags.length;
        }
    }
    return (
        <>
            <UserProfile />
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {postsData.map((obj, index) => isPostsLoading ? (
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
                            commentsCount={3}
                            tags={obj.tags}
                            isLoading={false}
                            isEditable={userData?._id === obj.user._id}
                        />
                    ))}
                </Grid>
                <Grid xs={4} item>
                    <SideBlock title="Info" >
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton disableTouchRipple>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="ahg0rb1iue18lvogo0sj918nfhraljjb" ><title id="ahg0rb1iue18lvogo0sj918nfhraljjb">Post</title>
                                        <path d="M19 22H5a3 3 0 01-3-3V3a1 1 0 011-1h14a1 1 0 011 1v12h4v4a3 3 0 01-3 3zm-1-5v2a1 1 0 002 0v-2h-2zm-2 3V4H4v15a1 1 0 001 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"></path>
                                    </svg>

                                    {postsData?.length || 0} posts published
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton disableTouchRipple>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a4c01t48nto356oehyo4d72ioh03tb2j" ><title id="a4c01t48nto356oehyo4d72ioh03tb2j">Comment</title>
                                        <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
                                    </svg>

                                    {sumComment} comments posted

                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton disableTouchRipple>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="ah4hu5wgte9c6l3ixi9go1vd9hltu0wy" ><title id="ah4hu5wgte9c6l3ixi9go1vd9hltu0wy">Tag</title>
                                        <path d="M7.784 14l.42-4H4V8h4.415l.525-5h2.011l-.525 5h3.989l.525-5h2.011l-.525 5H20v2h-3.784l-.42 4H20v2h-4.415l-.525 5h-2.011l.525-5H9.585l-.525 5H7.049l.525-5H4v-2h3.784zm2.011 0h3.99l.42-4h-3.99l-.42 4z"></path>
                                    </svg>

                                    {sumTags} tags posted
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </SideBlock>
                </Grid>
            </Grid>


        </>
    )
}