import authReducer from "./auth";
import postReducer from "./post";
import reducer from "./reducer";
import user from "./user";
import { combineReducers } from "redux";
const rootreducers = combineReducers({
  authReducer,
  postReducer,
  reducer,
  user,
});
export default rootreducers;
