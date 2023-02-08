import { SET_SEARCH, SET_MAP_SHOWING, SET_CURRENT_LOCATION } from "../actions/types";

const initialState = {};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      }
    case SET_SEARCH:
      return {
        ...state,
        searchValue: action.payload
      }
    case SET_MAP_SHOWING:
      return {
        ...state,
        mapShowing: action.payload
      };
    default:
      return state;
  }
};

export default mapReducer;