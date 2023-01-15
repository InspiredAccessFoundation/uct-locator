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
import TableData from "../Tables/TableData";

const TablePopup = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const tableId = props.tableId;
  const [tableData, setTableData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const onDataReceived = data => {
    setTableData(data);
    setLoading(false);
  }

  React.useEffect(() => {
    if (!tableId) {
      setLoading(true);
    }

  }, [tableId]);

  const open = props.open;
  const onClose = props.onClose;

  return (
    <>
      <TableData tableId={tableId} onDataReceived={onDataReceived} />
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
        <AppBar sx={{ position: 'relative' }}>
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
            <p><Link to={`/view-table/${tableData.id}`}>More Info</Link></p>
          </DialogContent>
        }
      </Dialog>
    </>
  );
};

export default TablePopup;
