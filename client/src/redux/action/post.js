import axios from "axios";
import {
  ADDCOMMENT,
  ADDPOST,
  DELETEPOST,
  GETPOSTS,
  GETUSERSPOSTS,
  LIKEPOST,
  UPDATEPOST,
} from "./types";
export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://instagramclone-backend-radhiarahmani.vercel.app/api/posts"
    );

    dispatch({
      type: GETPOSTS,
      payload: response.data,
    });
  } catch (error) {}
};

export const addPost = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://instagramclone-backend-radhiarahmani.vercel.app/api/posts",
      data
    );

    const responseData = await response.data; // Corrected to response.json() to parse JSON response

    dispatch({
      type: ADDPOST,
      payload: responseData,
    });
  } catch (error) {
    console.error(error); // Changed console.log to console.error for better visibility of errors
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  const response = await axios.get(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/posts/users/${id}`
  );
  const responseData = response.data;

  dispatch({
    type: GETUSERSPOSTS,
    payload: responseData,
  });
};

export const addComment = (id, comment, user) => async (dispatch) => {
  const response = await axios.put(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/comment/posts/${id}`,
    {
      comment,
      user,
    }
  );

  dispatch({
    type: ADDCOMMENT,
    payload: response.data,
  });
};

export const likePost = (id, userid) => async (dispatch) => {
  const response = await axios.put(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/like/posts/${id}`,
    {
      userid,
    }
  );

  dispatch({
    type: LIKEPOST,
    payload: response.data,
  });
};

export const deletePost = (id) => async (dispatch) => {
  const response = await axios.delete(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/posts/${id}`
  );

  dispatch({
    type: DELETEPOST,
    payload: response.data,
  });
};
//
export const updatePost = (id, caption) => async (dispatch) => {
  console.log(id, caption);
  const response = await axios.put(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/posts/${id}`,
    {
      caption,
    }
  );
  console.log(response.data.caption);
  dispatch({
    type: UPDATEPOST,
    payload: response.data,
  });
};
