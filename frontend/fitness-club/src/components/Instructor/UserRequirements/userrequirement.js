/*
 *
 * 
 * @desc Requested Plan List Table
 *
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Button } from "@material-ui/core";

//Hover Component For Delete Icon
const HoverDeleteButton = styled.p`
  :hover {
    cursor: pointer;
  }
`;

const columns = [
  {
    id: "User",
    label: "User",
    minWidth: 50,
    align: "center",
  },
  {
    id: "Weight",
    label: "Weight",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Heigth",
    label: "Heigth",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Gender",
    label: "Gender",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Requirement",
    label: "Requirement",
    minWidth: 180,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AddPlan",
    label: "",
    minWidth: 30,
    align: "center",
  },
];

function createData(User, Weight, Heigth, Gender, Requirement, AddPlan) {
  return {
    User,
    Weight,
    Heigth,
    Gender,
    Requirement,
    AddPlan,
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
  },
});

export default function RequestedPlansTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userRequestList, setUserRequestList] = useState([]);
  const [searchUser, setSearchUser] = useState();

  //fetching meallist data from the backend
  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/authinstructor", config)
      .then(({ data }) => {
        console.log(data.userRequests);

        console.log(data.userRequests.length);
        if (data.userRequests.length > 0) {
          setUserRequestList(data.userRequests);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function generatePDF() {
    const pdfText = {
      userRequestList: userRequestList,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/pdfgenerate/generateuserrequestlist",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }

  //map table row data
  const rows = userRequestList.map((currentRequest) => {
    return createData(
      currentRequest.userName,
      currentRequest.weight,
      currentRequest.height,
      currentRequest.gender,
      currentRequest.requirement,
      currentRequest.userProfile
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                        type="number"
                        placeholder="Search by Weight"
                        aria-label="Search"
                        onChange={(e) => {
                          setSearchUser(e.target.value);
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
                          <th>ID</th>
                          <th>userName</th>
                          <th>weight</th>
                          <th>height</th>
                          <th>gender</th>
                          <th>requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //return a single feedback component for each and every array Element
                          userRequestList.map((currentUserList) => {
                            if (searchUser <= currentUserList.weight)
                              return (
                                <tr>
                                  <td>{currentUserList._id}</td>
                                  <td>{currentUserList.userName}</td>
                                  <td>{currentUserList.weight}</td>
                                  <td>{currentUserList.height}</td>
                                  <td>{currentUserList.gender}</td>
                                  <td>{currentUserList.requirement}</td>
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
      <button
        className="btn btn-primary"
        onClick={generatePDF}
        style={{ margin: "10px" }}
      >
        Generate PDF
      </button>
      {/* <!-- search userreq modal --> */}
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target=".bd-example-modal-xl"
        style={{ margin: "10px" }}
      >
        search by weight
      </button>
      <hr />
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
                            style={{ color: "#333" }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : column.id === "ViewPlan" ? (
                              <HoverDeleteButton>
                                <Button variant="contained">View Plan</Button>
                              </HoverDeleteButton>
                            ) : column.id === "AddPlan" ? (
                              <HoverDeleteButton>
                                <Link to={"/userforms/" + value}>
                                  <Button variant="contained" color="primary">
                                    Add Plan
                                  </Button>
                                </Link>
                              </HoverDeleteButton>
                            ) : column.id === "EditPlan" ? (
                              <HoverDeleteButton>
                                <Button variant="contained" color="secondary">
                                  Update Plan
                                </Button>
                              </HoverDeleteButton>
                            ) : column.id === "Assigned" ? (
                              <HoverDeleteButton>
                                <Button variant="contained" color="secondary">
                                  {value}
                                </Button>
                              </HoverDeleteButton>
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
