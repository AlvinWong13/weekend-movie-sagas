import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

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
    threshold: 100,
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
// handle menu button in local state
const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);



// handle menu button open
const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

// handle menu button close
const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpen(false);
};

// menu button drop down
function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
}

  return (
    <div className={classes.root} >
      <AppBar position="fixed" style={{ background: 'transparent !important', boxShadow: 'none'}}>
        <Toolbar>
          <IconButton 
            edge="start" 
            ref={anchorRef}
            className={classes.menuButton} 
            color="inherit" 
            aria-label= "menu" 
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
          <Popper placement="bottom-start" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}><Link to ='/'>Movies</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to ='/addMovie'>Add Movie</Link></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
          <Typography 
            variant="h5" 
            className={classes.title}>
            The Movies Saga!
          </Typography>
        </Toolbar>
      </AppBar>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default Header;