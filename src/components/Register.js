import React, { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Profile from "./Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


  

async function AddUser(credentials) {
  return fetch('https://monitors.viterbo.edu/vapi/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Register() {
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [lname, setLname] = useState();
  const [fname, setFname] = useState();
  const [redir, setRedir] = useState(false);
  const [email, setEmail] = useState();
  const [data, setData] = useState();
  const [groups, setGroups] = useState([]);
  const [selectedFileGroup, setselectedFileGroup] = useState();
  const navigate = useNavigate();

  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //GroupsGet();
    // Update the document title using the browser API
    //document.title = `You clicked 1 times`;
    //getOptions_all();
  },[]);




  const handleSubmit = async e => {
    e.preventDefault();
    const response = await AddUser({
      username,
      password,
      lname,
      fname,
      email,
      groups: groups.join(','),
    });
    if ('status' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        window.location.href = "/app/profile";
        setRedir(true);
        navigate("/monitors");
      });
    } else {
      swal("Failed", response.message, "error");
    }
  }
  if (redir){
    return <Profile key={Date.now()} />
  }
  else{
  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              onChange={e => setUserName(e.target.value)}
            />
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fname"
              name="fname"
              label="First Name"
              onChange={e => setFname(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lname"
              name="lname"
              label="Last Name"
              onChange={e => setLname(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Password(If Not Using LDAP)"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Link to="/signin" >Sign In</Link>
           
          </form>

        </div>
      </Grid>
    </Grid>
  );
  }
}