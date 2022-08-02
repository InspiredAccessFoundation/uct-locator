import * as React from "react";
import axios from "../../axiosRequests";

const TableData = (props) => {
  const [tableData, setTableData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const tableId = props.tableId;
  const children = props.children;

  React.useEffect(() => {
    if (!tableId) {
      setTableData({});
    }
  }, [tableId]);

  React.useEffect(() => {
    if (tableId) {
      async function fetchData() {
        try {
          let response = await axios.get(`/api/tables/${tableId}`);
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
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the loading and tableData prop on the child
          return React.cloneElement(child, { "tableData": tableData, "loading": loading });
        }
      })}
    </>
  );
};

export default TableData;