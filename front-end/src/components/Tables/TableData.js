import * as React from "react";
import axios from "../../axiosRequests";

const TableData = (props) => {
  const tableId = props.tableId;
  const onDataReceived = props.onDataReceived;

  React.useEffect(() => {
    if (tableId) {
      async function fetchData() {
        try {
          let response = await axios.get(`/api/tables/${tableId}`);
          onDataReceived(response.data);
        } catch (e) {
          console.error("Something went wrong:", e);
          return [];
        }
      }
      
      fetchData();
    }
  }, [tableId, onDataReceived]);

  return null;
};

export default TableData;
