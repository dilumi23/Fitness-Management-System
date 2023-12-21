import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import axios from "axios";
import Background from "./img/1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    color: "#dadce0",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NewsList() {
  const [token, setToken] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [NoticeList, setNoticeList] = useState([]);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const userToken = localStorage.getItem("x-auth-token");
    setToken(userToken);
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/notices", config)
      .then(({ data }) => {
        if (data.length > 0) {
          console.log(data);
          setNoticeList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <List
      style={{
        borderRadius: "20px",
        // border: "2px solid blue",
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize: "cover",
        boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      //   subheader={
      //     <ListSubheader component="div" id="nested-list-subheader">
      //       Nested List Items
      //     </ListSubheader>
      //   }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <NotificationsActiveIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Notices" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {NoticeList.map((pack, index) => (
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={pack.NoticeTitle} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
