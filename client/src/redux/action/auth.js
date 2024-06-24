import axios from "axios";
import {
  DELETEACCOUNT,
  LOGOUT,
  RESETERROR,
  RESETMESSAGE,
  SIGNIN,
  SIGNUP,
} from "./types";
export const signUp = (data) => async (dispatch) => {
  try {
    console.log(data);
    await fetch("https://instagramclone-backend-radhiarahmani.vercel.app/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: SIGNUP,
          payload: response,
        });
      });
  } catch (error) {}
};
export const signIn = (email, password) => async (dispatch) => {
  try {
    await fetch("https://instagramclone-backend-radhiarahmani.vercel.app/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: SIGNIN,
          payload: response,
        });
      });
  } catch (error) {
  
  }
};

export const ResetError = () => async (dispatch) => {
  dispatch({
    type: RESETERROR,
  });
};
export const ResetMessage = () => async (dispatch) => {
  dispatch({
    type: RESETMESSAGE,
  });
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.setItem("isAuthenticated", false);
  dispatch({
    type: LOGOUT,
  });
};
// supprimer le  compte utilisateur
export const deleteUserAccount = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://instagramclone-backend-radhiarahmani.vercel.app/api/users/${id}`
    );
    localStorage.clear();
    dispatch({
      type: DELETEACCOUNT,
      payload: response.payload,
    });
  } catch (error) {
    console.log(error);
  }
};
