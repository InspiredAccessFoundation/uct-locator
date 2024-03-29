import * as React from "react";
import TableData from "./TableData";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";

const ViewTable = () => {
  const { tableId } = useParams();
  const [tableData, setTableData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const onDataReceived = data => {
    setTableData(data);
    setLoading(false);
  }

  return (
    <Container maxWidth="md">
      <TableData tableId={tableId} onDataReceived={onDataReceived} />
      {loading ? (
        <CircularProgress size="100px" />
      ) : (
        <p>{JSON.stringify(tableData)}</p>
      )}
    </Container>
  );
};

export default ViewTable;
