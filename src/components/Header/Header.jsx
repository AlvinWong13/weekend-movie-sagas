import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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

  return (
    <div className={classes.root} >
      <AppBar position="fixed" style={{ background: 'transparent !important', boxShadow: 'none'}}>
        <Toolbar>
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