import * as React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TablePopup = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <div>I'm a little popup. My id is {props.tableId} <button onClick={props.onClose}>X</button></div>
      <Dialog
        fullScreen={fullScreen}
        open={props.tableId !== ''}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <AppBar sx={{position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Title
            </Typography> 
            <IconButton
                edge="start"
                color="inherit"
                onClick={props.onClose}
                aria-label="close"
                >
                <CloseIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </>
  );
};

export default TablePopup;