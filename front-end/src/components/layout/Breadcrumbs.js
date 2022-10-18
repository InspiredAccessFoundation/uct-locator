import { useLocation } from "react-router-dom";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Paper from "@mui/material/Paper";
import Container from "@mui/system/Container";

import Link from "./Link";

import "./Breadcrumbs.css";

function getPathFriendlyName(path) {
  const friendlyNames = {
    register: "Register",
    login: "Login",
    find: "Find Tables",
    "view-table/d+": "View Table",
    "submit-table": "Submit Table",
  };

  const entries = Object.entries(friendlyNames);
  const lookup = entries.map(([regex, name]) => ({ regex, name }));
  const entry = lookup.find(({ regex }) => path.match(regex));

  return entry?.name;
}

function createPathBreadcrumbLink(_, index, paths) {
  const urlPath = paths.slice(0, index + 1).join("/");
  const friendlyName = getPathFriendlyName(urlPath);

  if (!friendlyName) {
    return undefined;
  }

  return (
    <Link underline="hover" to={urlPath} key={urlPath}>
      {friendlyName}
    </Link>
  );
}

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((x) => !!x);

  return (
    <Container maxWidth="md">
      <Paper className="breadcrumbs-wrapper">
        <MUIBreadcrumbs aria-label="breadcrumbs">
          <Link underline="hover" to="/">
            Home
          </Link>
          {paths.map(createPathBreadcrumbLink)}
        </MUIBreadcrumbs>
      </Paper>
    </Container>
  );
}
