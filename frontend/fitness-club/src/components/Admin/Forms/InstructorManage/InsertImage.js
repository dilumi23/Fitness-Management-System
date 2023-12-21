import React, { useState } from "react";
import axios from "axios";
import { FormControl, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 150,
  },
  inputControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function InsertImage() {
  const classes = useStyles();

  const [ItemImage, setItemImage] = useState(null);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("ItemImage", ItemImage);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/images/additems",
        formData,
        config
      )
      .then((res) => {
        alert("Item Added");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          type="file"
          onChange={(e) => setItemImage(e.target.files[0])}
          variant="outlined"
        />

        <Button
          onClick={onSubmit}
          variant="contained"
          style={{
            backgroundColor: "#263238",
            color: "white",
          }}
        >
          Insert
        </Button>
      </FormControl>
    </>
  );
}
