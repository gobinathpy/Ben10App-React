import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import { API } from "./global";
import { alienValidationSchema } from "./Addalien";
import { useFormik } from "formik";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import * as yup from "yup";

export function Editalien() {
  const { id } = useParams();
  //console.log(id);
  const [alien, setAlien] = useState(null);

  // CRUD - Read -  GET operation is performed here
  //useEffect is implemented here

  useEffect(() => {
    fetch(`${API}/aliens/${id}`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((bks) => setAlien(bks))
      .catch((err) => console.log(err));
  }, []);

  return <div>{alien ? <UpdateAlien alien={alien} /> : <h2>Loading</h2>}</div>;
}

function UpdateAlien({ alien }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: alien.name,
      poster: alien.poster,
      position: alien.position,
      summary: alien.summary,
      info: alien.info,
    },
    validationSchema: alienValidationSchema,
    onSubmit: (UpdatedAlien) => {
      editAlien(UpdatedAlien);
    },
  });

  // CRUD - Update -  POST operation is performed here
  const editAlien = (UpdatedAlien) => {
    console.log("Updated", UpdatedAlien);
    fetch(`${API}/aliens/${alien._id}`, {
      method: "PUT",
      body: JSON.stringify(UpdatedAlien),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/aliens"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1 style={{ color: "green" }}>
        <MenuBookIcon /> Here you can edit your Favourite Aliens
      </h1>
      <TextField
        className="text"
        label="Alien Name"
        variant="outlined"
        margin="dense"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
      />
      <TextField
        className="text"
        label="Poster"
        variant="outlined"
        margin="dense"
        id="poster"
        name="poster"
        onChange={formik.handleChange}
        value={formik.values.poster}
        onBlur={formik.handleBlur}
        error={formik.touched.poster && formik.errors.poster}
        helperText={
          formik.touched.poster && formik.errors.poster
            ? formik.errors.poster
            : ""
        }
      />
      <TextField
        className="text"
        label="Position"
        variant="outlined"
        margin="dense"
        id="position"
        name="position"
        onChange={formik.handleChange}
        value={formik.values.position}
        onBlur={formik.handleBlur}
        error={formik.touched.position && formik.errors.position}
        helperText={
          formik.touched.position && formik.errors.position
            ? formik.errors.position
            : ""
        }
      />
      <TextField
        className="text"
        label="Summary"
        variant="outlined"
        margin="dense"
        id="summary"
        name="summary"
        onChange={formik.handleChange}
        value={formik.values.summary}
        onBlur={formik.handleBlur}
        error={formik.touched.summary && formik.errors.summary}
        helperText={
          formik.touched.summary && formik.errors.summary
            ? formik.errors.summary
            : ""
        }
      />
      <TextField
        className="text"
        label="Info"
        variant="outlined"
        margin="dense"
        id="info"
        name="info"
        onChange={formik.handleChange}
        value={formik.values.info}
        onBlur={formik.handleBlur}
        error={formik.touched.info && formik.errors.info}
        helperText={
          formik.touched.info && formik.errors.info ? formik.errors.info : ""
        }
      />
      <Button variant="contained" type="submit">
        Update Alien
      </Button>
    </form>
  );
}
