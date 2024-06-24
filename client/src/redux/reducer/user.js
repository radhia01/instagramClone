import {
  ADDPOST,
  DELETEACCOUNT,
  FOLLOWUSER,
  GETUSERS,
  GETUSERSPOSTS,
  RESETERROR,
  RESETMESSAGE,
  UNFOLLOW,
  UPDATEIMAGE,
  UPDATEPASSWORD,
  UPDATEPROFILE,
} from "../action/types";

const initialState = {
  users: [],
  message: "",
  posts: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPOST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case GETUSERSPOSTS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case GETUSERS:
      return {
        ...state,
        users: action.payload,
      };
    case FOLLOWUSER:
      return {
        ...state,
        users: state.users.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
      };
    case UPDATEPROFILE:
      if (action.payload.success) {
        return {
          ...state,
          users: state.users.map((element) =>
            element._id === action.payload.user._id
              ? action.payload.user
              : element
          ),
          message: action.payload.message,
        };
      } else {
        return {
          ...state,
          error: action.payload.error,
        };
      }
    case UPDATEPASSWORD:
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error,
        };
      } else
        return {
          ...state,
          users: state.users.map((element) =>
            element._id === action.payload.updatedUser._id
              ? action.payload.updatedUser
              : element
          ),
          message: action.payload.message,
        };
    case UPDATEIMAGE:
      return {
        ...state,
        users: state.users.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
      };
  
    case RESETERROR: {
      return {
        ...state,
        error: null,
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
export default userReducer;
