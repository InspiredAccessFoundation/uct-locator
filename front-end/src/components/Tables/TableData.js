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
          const tableData = response.data
          tableData.fullAddress = (data) => {
            return `${data.streetAddress} ${data.city}, ${data.state} ${data.zipcode}`
          }
          onDataReceived(tableData);
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
