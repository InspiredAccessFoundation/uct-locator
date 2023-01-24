import CloseIcon from '@mui/icons-material/Close';
import DirectionsIcon from '@mui/icons-material/Directions';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, CircularProgress } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from "react";
import SvgIcon from '@mui/material/SvgIcon';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import MapIcon from '@mui/icons-material/Map';
import { iOS } from '../../utils/constants';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TableData from "../Tables/TableData";

const TablePopup = (props) => {
  const ref = React.useRef(null);

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
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        disableBackdropTransition={!iOS} disableDiscovery={iOS}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
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
            <h2>{tableData.locationName}</h2>
            <Divider></Divider>
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                height: "100%"
              }}
            >
              <Avatar>
                <SvgIcon>
                  <AppleIcon color="primary" />
                </SvgIcon>
              </Avatar>
              <Avatar>
                <SvgIcon>
                  <GoogleIcon color="primary" />
                </SvgIcon>
              </Avatar>
              <Link href={`mailto:${tableData.contactPhone}`}>
                <Avatar>
                  <PhoneIcon color="primary" />
                </Avatar>
              </Link>
              <Link href={`mailto:${tableData.contactEmail}`}>
                <Avatar>
                  <EmailIcon color="primary" />
                </Avatar>
              </Link>
            </Box>
            <Divider></Divider>
            <Box ref={ref} sx={{ display: "none" }}>
              <p>{tableData.contactPhone}</p>
              <p>{tableData.contactEmail}</p>
            </Box>

          </DialogContent>
        }
      </SwipeableDrawer>
    </>
  );
};

export default TablePopup;
