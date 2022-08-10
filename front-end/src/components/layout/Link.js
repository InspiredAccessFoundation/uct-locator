import MuiLink from "@mui/material/Link"
import { Link as RouterLink } from "react-router-dom";

export default function Link(props) {
  return <MuiLink {...props} component={RouterLink} />;
}
