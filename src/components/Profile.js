import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: 30,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.mon_root}>
      <Grid item xs={12} md={5} className={classes.large} >
      
          <h1>Viterbo's Monitor Control System</h1>
          <h2>Use Menu above to control options</h2>

        </Grid>
        <Grid item xs={12} md={5} className={classes.large} >
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Avatar src={user.avatar} className={classes.large} />
            <Typography variant="h5">
            Welcome {user.fname} {user.lname}
            </Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
    </div>
  );
}