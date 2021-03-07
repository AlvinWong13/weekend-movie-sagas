import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from '../Controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
      padding: theme.spacing(2),
      position:'absolute',
      top: theme.spacing(5)
    },
    dialogTitle: {
      paddingRight: '0px'
    }
}))

// function to handle popup for details
function PopupDetails(props) {

  const { children, openDetails, setOpenDetails } = props;
  const classes = useStyles();

  return (
    <Dialog open={openDetails} fullWidth maxWidth="md" classes={{ paper :classes.dialogWrapper }}>
        <DialogTitle>
              <Controls.ActionButton
                color="secondary"
                variant="outlined"
                onClick={() => {setOpenDetails(false)}}>
                <CloseIcon />
              </Controls.ActionButton>
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default PopupDetails;