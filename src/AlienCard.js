import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useHistory } from "react-router-dom";

export function AlienCard({
  id,
  name,
  poster,
  position,
  summary,
  deletebutton,
  editbutton,
}) {
  const [dislike, setdislike] = useState(0);
  const [like, setlike] = useState(0);
  const [show, setShow] = useState(false);
  const history = useHistory();
  return (
    <div>
      <Card className="alien-container">
        <CardContent>
          <img src={poster} id="res" className="poster" alt={name} />
          <h2 style={{ width: "320px" }}>{name}</h2>
          <div style={{ width: "350px" }}>
            <IconButton
              color="success"
              aria-label="toggle-summary"
              onClick={() => setShow((s) => !s)}
            >
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>

            {show ? <p className="alien-summary">{summary}</p> : ""}
            <IconButton
              color="primary"
              variant="outlined"
              onClick={() => {
                history.push(`/aliens/${id}`);
                console.log(id);
              }}
            >
              <InfoIcon />
            </IconButton>
          </div>
          <p>
            <b>Position :</b> {position}
          </p>
        </CardContent>
        <div className="button">
          <IconButton
            color="primary"
            aria-label="like-button"
            onClick={() => setlike(like + 1)}
          >
            <Badge badgeContent={like} color="primary">
              <ThumbUpIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="error"
            aria-label="dislike-button"
            onClick={() => setdislike(dislike + 1)}
          >
            <Badge badgeContent={dislike} color="error">
              <ThumbDownAltIcon />
            </Badge>
          </IconButton>
          {deletebutton}
          {editbutton}
        </div>
      </Card>
    </div>
  );
}
