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

function PopupForm(props) {

  const { title, children, openForm, setOpenForm } = props;
  const classes = useStyles();

  return (
    <Dialog open={openForm} fullWidth maxWidth="md" classes={{ paper :classes.dialogWrapper }}>
        <DialogTitle>
            <div style={{display: 'flex'}}>
              <Typography variant="h5" component="div" style={{flexGrow:1}}>
                {title}
              </Typography>
              <Controls.ActionButton
                color="secondary"
                variant="outlined"
                onClick={() => {setOpenForm(false)}}>
                <CloseIcon />
              </Controls.ActionButton>
            </div>
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default PopupForm;