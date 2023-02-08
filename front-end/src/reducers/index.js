import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mapReducer from "./mapReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  map: mapReducer,
  auth: authReducer,
  errors: errorReducer
});
