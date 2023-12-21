/*
 *
 * @desc List Table
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SettingsIcon from "@material-ui/icons/Settings";

import Background from "./img/1.jpg";

//Hover Component For Delete Icon
const HoverDeleteButton = styled.p`
  color: #ffffff;
  :hover {
    color: #ed1212;
    cursor: pointer;
  }
`;

//Hover Component For Edit Icon
const HoverEditButton = styled.p`
  color: #ffffff;
  :hover {
    color: blue;
    cursor: pointer;
  }
`;

const columns = [
  {
    id: "Topic",
    label: "Topic",
    align: "center",
    minWidth: 120,
  },
  { id: "Description", label: "Description", align: "center", minWidth: 100 },
  {
    id: "Link",
    label: "Link",
    minWidth: 50,
    align: "center",
  },
  {
    id: "Image",
    label: "Image",
    minWidth: 50,
    align: "center",
  },

  {
    id: "EditID",
    label: "",
    minWidth: 50,
    align: "center",
  },
  {
    id: "DeleteID",
    label: "",
    minWidth: 50,
    align: "center",
  },
];

function createData(Topic, Description, Link, Image, EditID, DeleteID) {
  return { Topic, Description, Link, Image, EditID, DeleteID };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
    borderRadius: "20px",
  },
  TableBody: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
    backgroundSize: "cover",
    backgroundOpacity: 0.5,
  },
});

export default function FitnessUpdatesTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [articlePost, setArticlePost] = useState([]);

  useEffect(() => {
    //if there is no admin navigate to the login page
    const token = localStorage.getItem("x-auth-token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      window.location = "/userlogin";
    }

    if (userRole !== "admin") {
      window.location = "/userlogin";
    }

    const sendData = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_BACKEND_URL + "/api/fitnessUpdate")
          .then((res) => {
            console.log(res.data);
            setArticlePost(res.data);
            // setLoading(false);
          })
          .catch((error) => {
            console.log("No data");
          });
      } catch (error) {
        console.log("No Data CATCH");
      }
    };

    sendData();
  }, []);

  //map table row data
  const rows = articlePost.map((currentPost) => {
    return createData(
      currentPost.topic,
      currentPost.description,
      currentPost.link,
      currentPost.image,
      currentPost._id,
      currentPost._id
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function deletePost(id) {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    await axios
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          "/api/fitnessUpdate/removepost/" +
          id,
        config
      )
      .then((response) => {
        console.log(response);
      });

    //rerender meal list(Get meallist Data from the backend)

    window.location = "/FitnessUpdatesTable";
  }

  return (
    <>
      <a href="/insertFitnessUpdate">
        <button class="btn btn-info">Add</button>
        <br />
        <br />
      </a>

      <Paper
        className={classes.root}
        style={{
          borderRadius: "20px",
          boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
        }}
        boxShadow={3}
      >
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      color: "white",
                      backgroundColor: "#db8465",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={classes.TableBody}>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            style={{ color: "white" }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : column.id === "Image" ? (
                              <img
                                src={value}
                                width="50px"
                                heigth="50px"
                                style={{ borderRadius: "50%" }}
                              />
                            ) : column.id === "DeleteID" ? (
                              <HoverDeleteButton>
                                <DeleteOutlineIcon
                                  onClick={() => {
                                    deletePost(value);
                                  }}
                                />
                              </HoverDeleteButton>
                            ) : column.id === "EditID" ? (
                              <Link
                                to={{
                                  pathname: "/updateFitnessUpdate",
                                  data: value,
                                }}
                              >
                                {" "}
                                <HoverEditButton>
                                  <SettingsIcon></SettingsIcon>
                                </HoverEditButton>
                              </Link>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
