import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import  commentSlice  from "./slices/comment";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comment: commentSlice,
    },
});

export default store;