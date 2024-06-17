import React from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { blue, grey, purple, red } from "@mui/material/colors";
import { Link, NavLink } from "react-router-dom";

function TopNavLink(props) {
  const { href, children } = props;
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive ? "active nav-text" : "nav-text";
      }}
      to={href}
    >
      {children}
    </NavLink>
  );
}

function NavBar() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar sx={{ backgroundColor: blue.A400 }} component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <TopNavLink href="/">Todos</TopNavLink>
            </Typography>
            <Box sx={{ display: { sm: "block" } }}>
              <Button sx={{ color: "#fff" }}>
                <Typography variant="h6" component="div"></Typography>
                <TopNavLink href="todo">todo</TopNavLink>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </>
  );
}

export default NavBar;
