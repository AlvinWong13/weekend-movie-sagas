import React from 'react';
import { useState, useEffect } from 'react';
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
import Box from '@material-ui/core/Box';

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
  appBarTransparent: {
    backgroundColor: 'rgba(67, 129, 168,0.5)'
  },
  appBarSolid: {
    backgroundColor: 'rgba(67, 129, 168)'
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

const [isVisible, setIsVisible] = useState(true);

const anchorRef = React.useRef(null);

// handle menu button open
const handleToggle = () => {
  setIsVisible(!isVisible);
};

const [navBackground, setNavBackground] = useState('appBarTransparent')
const navRef = React.useRef()
navRef.current = navBackground
useEffect(() => {
    const handleScroll = () => {
        const show = window.scrollY > 310
        if (show) {
            setNavBackground('appBarTransparent')
        } else {
            setNavBackground('appBarSolid')
        }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
        document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={classes.root} >
      <AppBar position="fixed" className={classes[navRef.current]}>
        <Toolbar>
          <Button 
            color="inherit"
            onClick={() => setOpenForm(true)}>
            Add Movie
          </Button>
          <Typography 
            variant="h4" 
            className={classes.title}>
            <Box textAlign="center" fontWeight="fontWeightBold">
              The Movies Saga!
            </Box>
          </Typography>
          {isVisible ? (
          <Button color="inherit" onClick={handleToggle}>Login</Button>
          ) : (
          <Button color="inherit" onClick={handleToggle}>Logout</Button>
          )}
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