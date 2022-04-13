import { useState } from "react";
import "./App.css";
import { Alienlist } from "./Alienslist";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Addalien } from "./Addalien";
import { Editalien } from "./EditAlien";
import { Homepage } from "./Homepage";
import { Aliendetails } from "./Aliendetails";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fragment } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function App() {
  const [mode, setMode] = useState("dark");
  //useContext is executed by using dark mode from material UI
  // create context is executed by createtheme
  // provier is themeprovider and theme is passed there
  // As all the material UI components are subscribed to dark mode there is no need for usetheme(usecontext)
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const history = useHistory();

  const array = [
    {
      name: "HOME",
      onClick: "/",
    },
    {
      name: "ALIENS",
      onClick: "/aliens",
    },
    {
      name: "ADD A ALIEN",
      onClick: "/aliens/add",
    },
  ];

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {array.map(({ name, onClick, icon }) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              history.push(onClick);
            }}
          >
            <ListItemText color="success" primary={name} />
            {icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ borderRadius: "0px", minHeight: "100vh" }} elevation={4}>
        <div className="App">
          <AppBar position="static" color="success">
            <Toolbar>
              {["left"].map((anchor) => (
                <Fragment key={anchor}>
                  <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon />
                    Menu
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </Fragment>
              ))}
              <Button
                color="inherit"
                style={{ marginLeft: "auto" }}
                startIcon={
                  mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              >
                {mode === "light" ? "dark" : "light"} Mode
              </Button>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/aliens/add">
              <Addalien />
            </Route>
            <Route path="/aliens/edit/:id">
              <Editalien />
            </Route>
            <Route path="/aliens/:id">
              <Aliendetails />
            </Route>
            <Route path="/aliens">
              <Alienlist />
            </Route>
            <Route path="**">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
