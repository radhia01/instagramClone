import {
  DELETEACCOUNT,
  LOGOUT,
  RESETERROR,
  RESETMESSAGE,
  SIGNIN,
  SIGNUP,
} from "../action/types";

const initialState = {
  users: [],
  success: false,
  token: null,
  user: null,
  error: null,
  successLogin: null,
  isAuthenticated: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        success: action.payload.success,
        error: action.payload.error,
      };
    case SIGNIN:
      if (action.payload.success) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("isAuthenticated", true);
        return {
          ...state,
          successLogin: action.payload.success,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
        };
      } else {
        return {
          ...state,
          error: action.payload.error,
        };
      }
    case DELETEACCOUNT:
      return {
        ...state,
        successLogin: null,
        isAuthenticated: false,
        users: state.users.filter(
          (element) => element._id !== action.payload._id
        ),
      };

    case RESETERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        error: null,
        successLogin: null,
        isAuthenticated: false,
        
      };
    }
    case RESETMESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
export default authReducer;
