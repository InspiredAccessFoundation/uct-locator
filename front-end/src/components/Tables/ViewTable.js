import * as React from "react";
import TableData from './TableData';
import { useParams } from 'react-router-dom';
import { CircularProgress } from "@mui/material";

const TableInfo = (props) => {
  const tableData = props.tableData;
  const loading = props.loading;

  return (
    <>
      {loading ?
        <CircularProgress size="100px" /> : 
        <p>{JSON.stringify(tableData)}</p>
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