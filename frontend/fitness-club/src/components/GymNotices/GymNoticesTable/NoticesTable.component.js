/*
 *
 * @desc Gym Notices Table
 *
 */

import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import Background from "./img/gym4.png";

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
    id: "title",
    label: "Notice Title",
    minWidth: 80,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "description",
    label: "Notice Description",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "date",
    label: "Date",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleDate("en-US"),
  },

  {
    id: "edit",
    label: "Edit",
    minWidth: 30,
    align: "center",
  },
  {
    id: "deleteNotice",
    label: "Delete",
    minWidth: 30,
    align: "center",
  },
];

function createData(title, description, date, edit, deleteNotice) {
  return {
    title,
    description,
    date,
    edit,
    deleteNotice,
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

export default function NoticesTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [NoticeList, setNoticeList] = useState([]);
  const [searchDate, setSearchDate] = useState();

  //fetching meallist data from the backend
  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/notices", config)
      .then(({ data }) => {
        if (data.length > 0) {
          setNoticeList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //map table row data
  const rows = NoticeList.map((note) => {
    return createData(
      note.NoticeTitle,
      note.NoticeDescriprion,
      note.Date.substring(0, 10),
      note._id,
      note._id
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
            deleteNotice(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }
  async function deleteNotice(id) {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    await axios
      .delete(process.env.REACT_APP_BACKEND_URL + "/api/notices/" + id, config)
      .then((response) => {
        console.log(response);
      });

    //rerender notice list(Get packagelist Data from the backend)

    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/notices", config)
      .then(({ data }) => {
        if (data.length > 0) {
          setNoticeList(data);
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
      <div>
        <div>
          <div>
            <div
              class="modal fade bd-example-modal-xl"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myExtraLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content" style={{ padding: "20px" }}>
                  {" "}
                  <div className="row">
                    {/* Row 1 */}
                    <div className="col-md-9">
                      <input
                        class="form-control"
                        type="date"
                        placeholder="Search by Date"
                        aria-label="Search"
                        onChange={(e) => {
                          setSearchDate(e.target.value.substring(0, 10));
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  {/* Row 2 */}
                  <div className="row">
                    <table className="table">
                      <thead className="thead">
                        <tr>
                          <th>Date</th>
                          <th>Notice Title</th>
                          <th>Notice Descriprion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //return a single notice component for each and every array Element
                          NoticeList.map((currentNotice) => {
                            if (
                              searchDate == currentNotice.Date.substring(0, 10)
                            )
                              return (
                                <tr>
                                  <td>{currentNotice._id}</td>
                                  <td>{currentNotice.NoticeTitle}</td>
                                  <td>{currentNotice.NoticeDescriprion}</td>
                                </tr>
                              );
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              pathname: "/ManageNotice",
            }}
          >
            <HoverAddButton style={{ margin: "10px" }}>
              <Add />
            </HoverAddButton>
          </Link>

          {/* <!-- search feedback modal --> */}
          <button
            type="button"
            class="btn btn-primary "
            data-toggle="modal"
            data-target=".bd-example-modal-xl"
            style={{ margin: "10px" }}
          >
            search by date
          </button>
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
                            ) : column.id === "deleteNotice" ? (
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
                                  pathname: "/ManageNotice",
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
