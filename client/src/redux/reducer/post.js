import {
  ADDCOMMENT,
  ADDPOST,
  DELETEPOST,
  GETPOSTS,
  LIKEPOST,
  RESETERROR,
  SIGNIN,
  SIGNUP,
  UPDATEPOST,
} from "../action/types";

const initialState = {
  posts: [],
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETPOSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case ADDPOST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case ADDCOMMENT:
      return {
        ...state,
        posts: state.posts.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
      };
    case LIKEPOST:
      return {
        ...state,
        posts: state.posts.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
      };
    case DELETEPOST:
      return {
        ...state,
        posts: state.posts.filter(
          (element) => element._id !== action.payload._id
        ),
      };
    case UPDATEPOST:
      return {
        ...state,
        posts: state.posts.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
      };
    default:
      return state;
  }
};
export default postReducer;
