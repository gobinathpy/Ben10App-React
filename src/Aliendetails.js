import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState, useEffect } from "react";
import { API } from "./global";

export function Aliendetails() {
  const { id } = useParams();
  console.log(id);
  const [alien, setAlien] = useState([]);

  //useEffect is implemented here
  //CRUD - Read - Get is executed here
  useEffect(() => {
    fetch(`${API}/aliens/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((alns) => setAlien(alns))
      .catch((err) => console.log(err));
  });
  const history = useHistory();
  return (
    <div>
      <h1>Alien Information</h1>

      <img className="alien" src={alien.poster} alt={alien.name} />

      <div className="alien-container">
        <h2>{alien.name}</h2>
        <p>
          <b>Position : </b>
          {alien.position}
        </p>
        <p>
          <b>Information : </b>
          {alien.info}
        </p>

        <Button
          onClick={() => {
            history.goBack();
          }}
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
