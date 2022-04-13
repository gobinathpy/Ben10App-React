import { AlienCard } from "./AlienCard";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "./global";

export function Alienlist() {
  const history = useHistory();

  const [alienlist, setAlienlist] = useState([]);

  // CRUD - Read -  GET operation is performed here

  const getAliens = () => {
    fetch(`${API}/aliens`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((alns) => setAlienlist(alns));
  };
  //useEffect is implemented here
  useEffect(() => getAliens(), []);

  // CRUD - Delete -  DELETE operation is performed here
  const deleteAlien = (id) => {
    fetch(`${API}/aliens/${id}`, {
      method: "DELETE",
    }).then(() => getAliens());
  };

  return (
    <div>
      <h1 className="head">Welcome to the Alien's world</h1>
      <div className="list">
        {alienlist.map(({ name, poster, position, _id, info, summary }) => (
          <AlienCard
            key={_id}
            name={name}
            id={_id}
            poster={poster}
            position={position}
            summary={summary}
            info={info}
            deletebutton={
              <IconButton
                style={{ marginLeft: "auto" }}
                color="error"
                onClick={() => {
                  deleteAlien(_id);
                }}
                aria-label="delete"
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            }
            editbutton={
              <IconButton
                color="secondary"
                onClick={() => history.push(`/aliens/edit/${_id}`)}
                aria-label="edit"
                size="medium"
              >
                <EditIcon />
              </IconButton>
            }
          />
        ))}
      </div>
    </div>
  );
}
