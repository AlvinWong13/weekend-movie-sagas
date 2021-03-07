import React from 'react';
import { useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import MovieForm from '../MovieForm/MovieForm';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function ScrollTop(props) {
const { children, window } = props;
const classes = useStyles();
const trigger = useScrollTrigger({
  target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
});
const handleClick = (event) => {
  const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

  if (anchor) {
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

return (
  <Zoom in={trigger}>
    <div onClick={handleClick} role="presentation" className={classes.root}>
      {children}
    </div>
  </Zoom>
);
}

function Header(props) {
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const [openForm, setOpenForm = () => {
  setOpen((prev) => !prev);
},
] = useState(false);

const handleClickAway = () => {
  setOpen(false);
};


  return (
    <div className={classes.root} >
      <AppBar position="fixed" style={{ background: 'transparent !important', boxShadow: 'none'}}>
        <Toolbar>
          <Button 
            color="inherit"
            onClick={() => setOpenForm(true)}>
            Add Movie
          </Button>
          <div className="typeHeader">
          <Typography 
            variant="h5" 
            className={classes.title}>
            The Movies Saga!
          </Typography>
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <ClickAwayListener onClickAway={handleClickAway}>
      <PopupForm
        title="Add a New Movie"
        openForm = {openForm}
        setOpenForm = {setOpenForm}
        >
          <MovieForm setOpenForm= {setOpenForm}/>
      </PopupForm>
      </ClickAwayListener>
    </div>
  );
}

export default Header;