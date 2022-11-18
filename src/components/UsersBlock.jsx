import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Link } from "react-router-dom";

export const UsersBlock = ({ users, children, isLoading }) => {

    return (
        <SideBlock title="Пользователи">
            <List>
                {(isLoading ? [...Array(5)] : users)?.slice(0, 8).map((obj, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar alt={obj.fullName} src={obj.avatarUrl ? `https://envil-blog-mern.herokuapp.com/uploads/${obj.avatarUrl}` : '/noavatar.png'} />
                        </ListItemAvatar>
                        <Link to={`/user/${obj._id}`}>
                            <ListItemText primary={obj.fullName} secondary={obj.email} xs={{color: "black"}}/>
                        </Link>
                    </ListItem>
                ))}
            </List>
            {children}
        </SideBlock>
    );
};