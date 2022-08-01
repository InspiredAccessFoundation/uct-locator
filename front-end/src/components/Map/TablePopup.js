import * as React from "react";
import Axios from "axios";
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
import { setupCache } from 'axios-cache-interceptor';

const axios = setupCache(Axios);

const TablePopup = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [tableData, setTableData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const tableId = props.tableId;

  React.useEffect(() => {
    if (!tableId) {
      setTableData({});
    }
  }, [tableId]);

  React.useEffect(() => {
    if (tableId) {
      async function fetchData() {
        try {
          let response = await axios.get(`api/tables/${tableId}`);
          setTableData(response.data);
        } catch (e) {
          console.error("Something went wrong:", e);
          return [];
        } finally {
          setLoading(false);
        }
      }
      
      setLoading(true);
      fetchData();
    }
  }, [tableId]);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        scroll="paper"
        open={tableId !== ''}
        onClose={props.onClose}
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
              onClick={props.onClose}
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
          </DialogContent>
        }
      </Dialog>
    </>
  );
};

export default TablePopup;