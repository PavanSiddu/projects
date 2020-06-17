import React from 'react';
import Addtodo from './containers/addTodo';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Side from './containers/notCompleted';
import Trash from './containers/trash';
import Completed from './containers/Completed';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//side bar
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function ButtonAppBar() {

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link to='/home'>
          <ListItem button >
            <ListItemText primary='ADD' /></ListItem>
        </Link>
        <Link to='/add'>
          <ListItem button >
            <ListItemText primary='NOT COMPLETED' /></ListItem>
        </Link>
        <Link to='/completed'>
          <ListItem button >
            <ListItemText primary='COMPLETED' /></ListItem></Link>
        <Link to='/trash'>
          <ListItem button >
            <ListItemText primary='TRASH' /></ListItem></Link>
      </List>
      <Divider />
    </div>
  );

  // App bar  
  const classes1 = useStyles();

  return (
    <div className={classes1.root}>
      <Router>
        <AppBar position="static">
          <Toolbar style={{ textAlign: 'center' }}>

            <IconButton edge="start" className={classes1.menuButton} color="inherit" aria-label="menu">
              <MenuIcon onClick={toggleDrawer('left', true)} />
              <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
              </Drawer>
            </IconButton>

            <Typography variant="h6" className={classes1.title}>
              <b><i> TODO APP :) </i></b>
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path='/home'>
            <Addtodo />
          </Route>
          <Route path='/add'>
            <Side />
          </Route>
          <Route path='/completed'>
            <Completed />
          </Route>
          <Route path='/trash'>
            <Trash />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

