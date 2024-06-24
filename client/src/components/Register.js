import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../redux/action/auth";
import Error from "./Error";
import { ResetError } from "../redux/action/auth";
import { useEffect } from "react";
const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.authReducer);

  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
    user: "",
  });
  const handleChange = (e) => {
    dispatch(ResetError());
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = (e) => {
    dispatch(ResetError());
    e.preventDefault();
    dispatch(signUp(userData));
  };
  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);
  return (
    <div className="register d-flex justify-content-center p-5">
      <div className="col-md-3  p-3   shadow  fs-1 bg-white border">
        <div className="d-flex justify-content-center">
          <p className="text-center">Instagram</p>
        </div>
        <div className="text-center">
          <span style={{ fontSize: 12 }}>
            Inscrivez-vous pour voir les photos et vidéos de vos amis.
          </span>
        </div>{" "}
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className="form-control "
            placeholder="Nom d'numero mobile ou email "
          />
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="form-control "
            placeholder="nom complet "
          />
          <input
            type="text"
            name="user"
            onChange={handleChange}
            className="form-control "
            placeholder="nom utilisateur"
          ></input>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control "
            placeholder="mot de passe"
          ></input>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary   fs-6 mt-4 btnconnexion d-flex justify-content-center align-items-center"
            >
              S'inscrire
            </button>{" "}
          </div>
        </form>
        <hr />
        <div className="fs-6 d-flex justify-content-center">
          <span>Vous avez un compte ?</span> <a href="/">Connectez-vous</a>
        </div>
      </div>
      {error && <Error message={error} />}
    </div>
  );
};

export default Register;
