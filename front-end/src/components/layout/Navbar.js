import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const Navbar = (props) => {
  const theme = useTheme();
  const bg = theme.palette.primary.main;
  const fg = theme.palette.primary.contrastText;

  const loggedIn = props.auth.isAuthenticated;

  const [drawerOpen, setDrawerOpen] = React.useState();

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  let drawerLinks = [
    {
      text: "Home",
      href: "/",
      icon: <HomeIcon />
    },
    {
      text: "Find a Table",
      href: "/find",
      icon: <SearchIcon />
    }
  ];

  if (loggedIn) {
    drawerLinks.push({
      text: "Submit a Table",
      href: "/submit-table",
      icon: <AddLocationIcon />
    });
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: bg, color: fg }}>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: fg }}>UCT Locator</Link>
          </Typography>
          {loggedIn ? (
            <div>
              <div>
                <Button sx={{ color: fg }} onClick={onLogoutClick}>Logout</Button>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button sx={{ color: fg }}>Login</Button>
              </Link>
              <Link to="/register">
                <Button sx={{ color: fg }}>Register</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          sx={{ backgroundColor: bg, minWidth: "300px", height: "100%", color: fg }}
        >
          <List>
            <ListItem>
              <ListItemButton onClick={() => setDrawerOpen(false)} sx={{ color: fg, paddingRight: "0px" }}>
                <ChevronLeftIcon />
              </ListItemButton>
              <ListItemText>
                <Typography variant="h6">Navigation Menu</Typography>
              </ListItemText>
            </ListItem>
            {
              drawerLinks.map((dl, i) => (
                <ListItem key={i}>
                  <Link to={dl.href} style={{ display: "flex", paddingLeft: "1rem" }}>
                    <ListItemIcon style={{ color: fg }}>
                      {dl.icon}
                    </ListItemIcon>
                    <ListItemText style={{ color: fg }}>{dl.text}</ListItemText>
                  </Link>
                </ListItem>
              ))
            }
          </List>
        </Box>
      </Drawer>
    </>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);