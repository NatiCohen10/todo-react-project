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

const navItems = ["Home", "About", "Todo", "Activity"]; // Define your nav items here

function handleDrawerToggle() {
  // Handle drawer toggle logic here
  console.log("Drawer toggle clicked");
}

function NavBar() {
  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "black" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Box sx={{ display: { sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </>
  );
}

export default NavBar;
