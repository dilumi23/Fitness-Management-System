/*
 *
 *
 */
import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import styled from "styled-components";

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
import Add from "@material-ui/icons/Add";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Background from "./img/gym4.png";
import { Link } from "react-router-dom";
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

//Hover Component For Add Icon
const HoverAddButton = styled.p`
  color: #ffffff;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  padding: 7px 0;
  text-align: center;
  background: rgb(8 87 130);
  :hover {
    color: rgb(80 222 71);
    cursor: pointer;
  }
`;
const columns = [
  {
    id: "name",
    label: "Package Name",
    minWidth: 80,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "description",
    label: "Package Description",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "price",
    label: "Package Price",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "period",
    label: "Package Period",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "edit",
    label: "Edit",
    minWidth: 30,
    align: "center",
  },
  {
    id: "deletePackage",
    label: "Delete",
    minWidth: 30,
    align: "center",
  },
];

function createData(name, description, price,period, edit, deletePackage) {
  return {
    name,
    description,
    price,
    period,
    edit,
    deletePackage,
  };
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
    background: "linear-gradient(45deg, #ededed 30%, #fcfcfc 90%)",
    borderRadius: "20px",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
    backgroundSize: "cover",
    backgroundOpacity: 0.5,
  },
});

export default function PackageDetails() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [PackageList, setPackageList] = useState([]);

  //fetching package list data from the backend
  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/packages", config)
      .then(({ data }) => {
        if (data.length > 0) {
          setPackageList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //map table row data
  const rows = PackageList.map((pack) => {
    return createData(
      pack.PackageName,
      pack.PackageDescriprion,
      pack.PackagePrice,
      pack.PackagePeriod,
      pack._id,
      pack._id
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function deleteButtonClick(id) {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePackage(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }
  async function deletePackage(id) {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    await axios
      .delete(process.env.REACT_APP_BACKEND_URL + "/api/packages/" + id, config)
      .then((response) => {
        console.log(response);
      });

    //rerender package list(Get packagelist Data from the backend)

    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/packages", config)
      .then(({ data }) => {
        if (data.length > 0) {
          setPackageList(data);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Paper
        className={classes.root}
        style={{
          borderRadius: "20px",
          boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
        }}
        boxShadow={3}
      >
        <div class="input-group-append">
          <Link
            to={{
              pathname: "/ManageGymPackage",
            }}
          >
            <HoverAddButton>
              <Add />
            </HoverAddButton>
          </Link>
        </div>
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
                      backgroundColor: "#085782",
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
                            ) : column.id === "deletePackage" ? (
                              <HoverDeleteButton>
                                <DeleteOutlineIcon
                                  onClick={() => {
                                    deleteButtonClick(value);
                                  }}
                                />
                              </HoverDeleteButton>
                            ) : column.id === "edit" ? (
                              <Link
                                to={{
                                  pathname: "/ManageGymPackage",
                                  data: value,
                                }}
                              >
                                <HoverEditButton>
                                  <SettingsIcon />
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

      <br />
    </>
  );
}
