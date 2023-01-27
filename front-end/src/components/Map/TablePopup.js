import AppleIcon from '@mui/icons-material/Apple';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, CircularProgress } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import * as React from "react";
import { iOS } from '../../utils/constants';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import image1 from '../../images/1.jpg'
import image2 from '../../images/2.jpg'

import Tooltip from '@mui/material/Tooltip'

import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import Woman2Icon from '@mui/icons-material/Woman2';
import Man2Icon from '@mui/icons-material/Man2';
import AccessibleIcon from '@mui/icons-material/Accessible';
import NotAccessibleIcon from '@mui/icons-material/NotAccessible';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

// Publicly Accessible
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';

// Table style 
import AirlineSeatFlatAngled from '@mui/icons-material/AirlineSeatFlatAngled';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

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
  const height = "100";
  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) {
        cancel()
      }

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          lessThings()
        } else {
          moreThings()
        }
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else { }
    },
    { from: () => [0, height], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  )

  const moreThings = e => {
    ref.current.style.overflowY = "scroll"
    ref.current.style.height = "85vh"
  }
  const lessThings = e => {
    // TODO FIGURE OUT A BETTER WAY TO SIZE THIS BASED ON A CALCUATION
    ref.current.style.height = "20vh"
    ref.current.style.overflowY = "hidden"
  }

  return (
    <>
      <TableData tableId={tableId} onDataReceived={onDataReceived} />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        disableBackdropTransition={!iOS} disableDiscovery={iOS}
      >
        <Box {...bind()} sx={{ touchAction: 'none' }}>
          {loading ?
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size="100px" />
            </Box> :
            <>
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
                    {tableData.locationName}
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
              <DialogContent ref={ref}
                sx={{
                  height: "20vh",
                  maxHeight: "100vh",
                  transition: "height 0.2s linear",
                  overflowY: "hidden"
                }}>
                <p>{tableData.restroomType}</p>
                <p>{tableData.tableStyle}</p>
                <p>{tableData.publiclyAccessible}</p>
                <Divider></Divider>
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Tooltip title="Publicly Accessible">
                    <Avatar>
                      <PublicIcon color="primary" />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Patrons/Patients Only">
                    <Avatar>
                      <PublicOffIcon color="primary" />
                    </Avatar>
                  </Tooltip>

                  <Tooltip title="Men's restroom">
                    <Avatar>
                      <Man2Icon color="primary" />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Women's restroom">
                    <Avatar>
                      <Woman2Icon color="primary" />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Family restroom">
                    <Avatar>
                      <FamilyRestroomIcon color="primary" />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Fixed height">
                    <Avatar>
                      <AirlineSeatFlatIcon color="primary"></AirlineSeatFlatIcon>
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Adjustable">
                    <Avatar>
                      <AirlineSeatFlatAngled color="primary" />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Portable">
                    <Avatar>
                      <WorkOutlineIcon color="primary" />
                    </Avatar>
                  </Tooltip>

                  <Tooltip title="Directions using Apple Maps">
                    <Link href={"http://maps.apple.com/?daddr=" + tableData.fullAddress(tableData) + "&dirflg=d&t=h"} target={"_blank"} rel="noopener">
                      <Avatar>
                        <AppleIcon color="primary" />
                      </Avatar>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Directions using Google Maps">
                    <Link href={"https://www.google.com/maps?saddr=My+Location&daddr=" + tableData.fullAddress(tableData)} target={"_blank"} rel="noopener">
                      <Avatar>
                        <GoogleIcon color="primary" />
                      </Avatar>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Call">
                    <Link href={`tel:${tableData.contactPhone}`}>
                      <Avatar>
                        <PhoneIcon color="primary" />
                      </Avatar>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Email">
                    <Link href={`mailto:${tableData.contactEmail}`}>
                      <Avatar>
                        <EmailIcon color="primary" />
                      </Avatar>
                    </Link>
                  </Tooltip>
                </Box>
                <Divider></Divider>
                <Link onClick={moreThings}>More</Link>
                <Box>
                  <label>Address</label>
                  <p>{tableData.fullAddress(tableData)}</p>
                  <label>Phone Number</label>
                  <p>{tableData.contactPhone}</p>
                  <label>Email</label>
                  <p>{tableData.contactEmail}</p>
                  <label>Location within building</label>
                  <p>{tableData.locationWithinBuilding}</p>
                  <label>Hours of operation</label>
                  <p>{tableData.hours}</p>
                  <label>Additional Details</label>
                  <p>{tableData.additionalInfo}</p>
                </Box>
                <Divider></Divider>
                <Box>
                  <ImageList
                    variant="quilted"
                    cols={3}
                    rowHeight={121}
                  >
                    <ImageListItem key={1} cols={1} rows={1}>
                      <img
                        src={image1}
                        alt="Test1"
                        loading="lazy"
                      />
                    </ImageListItem>
                    <ImageListItem key={2} cols={1} rows={1}>
                      <img
                        src={image2}
                        alt="Test2"
                        loading="lazy"
                      />
                    </ImageListItem>
                    <ImageListItem key={3} cols={1} rows={1}>
                      <img
                        src={image1}
                        alt="Test1"
                        loading="lazy"
                      />
                    </ImageListItem>
                    <ImageListItem key={4} cols={1} rows={1}>
                      <img
                        src={image2}
                        alt="Test2"
                        loading="lazy"
                      />
                    </ImageListItem>
                    <ImageListItem key={5} cols={1} rows={1}>
                      <img
                        src={image1}
                        alt="Test1"
                        loading="lazy"
                      />
                    </ImageListItem>
                    <ImageListItem key={6} cols={1} rows={1}>
                      <img
                        src={image2}
                        alt="Test2"
                        loading="lazy"
                      />
                    </ImageListItem>
                  </ImageList>
                </Box>

              </DialogContent>
            </>
          }
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default TablePopup;
