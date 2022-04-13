import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { API } from "./global";
import { useFormik } from "formik";
import * as yup from "yup";

export const alienValidationSchema = yup.object({
  name: yup.string().required("Why not fill this name? 😉"),
  poster: yup
    .string()
    .required("Why not fill this poster? 😉")
    .min(4, "Need a longer poster link 😄"),
  position: yup
    .number()
    .required("Why not fill this published year? 😉")
    .min(1),
  summary: yup.string().required("Why not fill this summary? 😉").min(20),
  info: yup.string().required("Why not fill this info? 😉").min(10),
});

export function Addalien() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      position: "",
      summary: "",
      info: "",
    },
    validationSchema: alienValidationSchema,
    onSubmit: (newAlien) => {
      addAlien(newAlien);
    },
  });

  // CRUD - create -  POST operation is performed here
  const addAlien = (newAlien) => {
    console.log("onSubmit", newAlien);
    fetch(`${API}/aliens/`, {
      method: "POST",
      body: JSON.stringify([newAlien]),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/aliens"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1 style={{ color: "green" }}>Here you can add your Favourite Alien </h1>
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
        Add Alien
      </Button>
    </form>
  );
}
