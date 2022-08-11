import * as React from "react";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const TablePopup = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const tableData = props.tableData;
  const loading = props.loading;
  const open = props.open;
  const onClose = props.onClose;

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        scroll="paper"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            height: "100vh"
          }
        }}
      >
        <AppBar sx={{position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Changing Table Location
            </Typography> 
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              >
                <CloseIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
        {loading ?
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
          >
            <CircularProgress size="100px" />
          </Box> : 
          <DialogContent>
            <p>{tableData.locationName}</p>
            <p>{tableData.streetAddress}</p>
            <p>{tableData.restroomType}</p>
            <p><Link to={`/view-table/${tableData._id}`}>More Info</Link></p>
          </DialogContent>
        }
      </Dialog>
    </>
  );
};

export default TablePopup;