import axios from "axios";
import {
  FOLLOWUSER,
  GETUSERS,
  UNFOLLOW,
  UPDATEIMAGE,
  UPDATEPASSWORD,
  UPDATEPROFILE,
} from "./types";
// get all users
export const getUsers = () => async (dispatch) => {
  const response = await axios.get(
    "https://instagramclone-backend-radhiarahmani.vercel.app/api/users"
  );
  dispatch({
    type: GETUSERS,
    payload: response.data,
  });
};

// follow  user
export const followUser = (id, userid) => async (dispatch) => {
  const response = await axios.put(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/users/followers/${id}`,
    { userid }
  );
  console.log(response.data)
  dispatch({
    type: FOLLOWUSER,
    payload: response.data,
  });
};
// unfollow user
export const unfollowUser = (id, userid) => async (dispatch) => {
  const response = await axios.put(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/users/unfollow/${id}`,
    { userid }
  );
  dispatch({
    type: UNFOLLOW,
    payload: response.data,
  });
};
// update user profile
export const updateUserProfile = (id, user) => async (dispatch) => {
  console.log(id);
  const response = await axios.put(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/users/profile/${id}`,
    user
  );
  console.log(response);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return dispatch({
    type: UPDATEPROFILE,
    payload: response.data,
  });
};
// upadate user password
export const updateUserPassword = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://instagramclone-backend-radhiarahmani.vercel.app/api/users/update/password/${id}`,
      data
    );
    console.log(response.data);
    dispatch({
      type: UPDATEPASSWORD,
      payload: response.data,
    });
  } catch (error) {
    // Si une erreur se produit, récupérez l'erreur et dispatch une action avec l'erreur
    dispatch({
      type: UPDATEPASSWORD,
      payload: { error: error.response.data.error },
    });
  }
};
/// update user profile image
export const updateImageProfile = (data) => async (dispatch) => {
  console.log(data);
  const response = await axios.put(
    `https://instagramclone-backend-radhiarahmani.vercel.app/api/users/image/profile`,
    data
  );

  localStorage.setItem("user", JSON.stringify(response.data));
  dispatch({
    type: UPDATEIMAGE,
    payload: response.data,
  });
};
