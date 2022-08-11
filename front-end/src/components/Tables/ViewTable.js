import * as React from "react";
import TableData from './TableData';
import { useParams } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WcIcon from '@mui/icons-material/Wc';
import SignpostIcon from '@mui/icons-material/Signpost';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import DescriptionIcon from '@mui/icons-material/Description';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallIcon from '@mui/icons-material/Call';
import FlagIcon from '@mui/icons-material/Flag';
const TableInfo = (props) => {
  const tableData = props.tableData;
  const loading = props.loading;



  return (
    <>
      {loading ?
        <CircularProgress size="100px" /> : 
       // <><p>{JSON.stringify(tableData)}</p>
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocationOnIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary= {"Location Name: "+ tableData.locationName} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SignpostIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Address: " + tableData.locationAddress + "," + tableData.city + "," + tableData.state + "," + tableData.zipcode} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ApartmentIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Location within building: " + tableData.locationWithinBuilding} />
       
      </ListItem>
      
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WcIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Restroom Type: " + tableData.restroomType}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TableRestaurantIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Table Style: " + tableData.tableStyle} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DescriptionIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Notes: " + tableData.tableInfo}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LockOpenIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Accessibility: " + tableData.publicAccessibility} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccessTimeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Hours: " + tableData.hours}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CallIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Contact Info: " + tableData.contactPhone + "," + tableData.contactEmail}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FlagIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Status: " + tableData.staus} />
      </ListItem>
      <img
        //style="float: right;"
        src="https://max-ability.com/wp-content/uploads/2018/04/PC-2000-in-family-restroom.jpg"  
        style ={{width: 300, height: 200, position: 'Right'}}
        
       />
    </List>
    
        
      }
    </>
  );
};

const ViewTable = () => {
  const { tableId } = useParams();


  return (
     <TableData tableId={tableId}>
       <TableInfo />
     </TableData>

   
  
  
    
  );
};

export default ViewTable;