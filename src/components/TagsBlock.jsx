import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGetByTag } from "../redux/slices/posts";



export const TagsBlock = ({ items, isLoading = true }) => {
  const dispatch = useDispatch();

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items)?.map((name, i) => name && (
          <Link
            key={i}
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
            onClick={() => {
              dispatch(fetchGetByTag(name));
            }}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
