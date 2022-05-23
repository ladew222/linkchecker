import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const user = JSON.parse(localStorage.getItem('user'));

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    isDrawerOpen: false,

  };
  

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/app/";
  };
  setIsDrawerOpen = (value)  =>{
    this.setState({ isDrawerOpen: value });
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => this.setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
            
            
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Website Monitoring  System
            </Typography>
            <Drawer open={this.state.isDrawerOpen} onClose={() => this.setIsDrawerOpen(false)}>
                <List className={classes.drawer}>
                    <ListItem button component={Link} to="/monitors">
                        <ListItemText primary=" Attach Slides (Groups and Monitors)"/>
                    </ListItem>
                    
                    
                    <ListItem button component={Link} to="/library">
                        <ListItemText primary="Upload Slides (File Lirbrary)"/>
                    </ListItem>
                     { user.is_admin>1 ?  <ListItem button component={Link} to="/status">
                        <ListItemText primary="Monitor Statuses"/>
                    </ListItem>: ''}
                    { user.is_admin>1 ?  <ListItem button component={Link} to="/alert">
                        <ListItemText primary="Alert Notifications"/>
                    </ListItem>: ''}
                    { user.is_admin>2 ?  <ListItem button component={Link} to="/admin">
                        <ListItemText primary="User Admin"/>
                    </ListItem>: ''}
                    
                    
          
                   
                </List>
            </Drawer>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem component={Link} to='/profile'>Profile</MenuItem>
                  <MenuItem component={Link} to='/library'>Library</MenuItem>
                  <MenuItem component={Link} to="/monitors">Attach Slides</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);