import * as React from "react";
import TableData from "./TableData";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";

const TableInfo = (props) => {
  const tableData = props.tableData;
  const loading = props.loading;

  return (
    <Container maxWidth="md">
      {loading ? (
        <CircularProgress size="100px" />
      ) : (
        <p>{JSON.stringify(tableData)}</p>
      )}
    </Container>
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
