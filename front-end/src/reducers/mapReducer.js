import { SET_MAP_SHOWING } from "../actions/types";

const initialState = {};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
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