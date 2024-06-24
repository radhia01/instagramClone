import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../redux/action/auth";
import Error from "./Error";
import { ResetError } from "../redux/action/auth";
import { useEffect } from "react";
const Login = ({ setisAuthenticated }) => {
  const { error, successLogin } = useSelector((state) => state.authReducer);
  
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(ResetError());
    e.preventDefault();
    dispatch(signIn(email, password));
  };
  useEffect(() => {
    if (successLogin) {
      setisAuthenticated(true);
      history.push("/home");
    } else {
      history.push("/");
    }
  }, [successLogin]);
  return (
    <div className="login  d-flex justify-content-center   p-3">
      <div className="col-md-3  shadow fs-1 bg-white border p-5">
        <p className="text-center">Instagram</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control "
              placeholder="Num,telephone,nom d'utilisateur ou e-mail"
              onChange={(event) => setemail(event.target.value)}
            />
          </div>
          <div>
            {" "}
            <input
              type="password"
              className="form-control "
              placeholder="Mot de passe"
              onChange={(event) => setpassword(event.target.value)}
            ></input>
          </div>
          <div>
            <button className="btn   mt-3 btnconnexion" type="submit">
              Se Connecter
            </button>{" "}
          </div>
        </form>
        <hr />
        {/* <i className="fab fa-facebook fs-6 " style={{ marginLeft: "80px" }}> */}{" "}
        <div className="d-flex p-1">
          <span>Vous n'avez pas de compte ?</span>
          <a href="/register">Inscrivez vous</a>
        </div>
      </div>
      {error && <Error message={error} />}
    </div>
  );
};

export default Login;
