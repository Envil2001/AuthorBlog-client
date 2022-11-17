import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }} sx={{ borderRadius: '12px', boxShadow: '0 2px 4px 0 rgb(32 35 51 / 2%), 0 1px 1px 0 rgb(32 35 51 / 4%)' }}>
      <Typography variant="h6" classes={{ root: styles.title }} >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
