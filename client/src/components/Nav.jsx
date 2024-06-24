import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getUsers } from "../redux/action/user";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import { logout } from "../redux/action/auth";
const Nav = ({ showPost, setisAuthenticated }) => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const { users } = useSelector((state) => state.user);
  const [showdiv, setshowdiv] = useState(false);
  const dispatch = useDispatch();
  const [input, setinput] = useState("");
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handleInput = (e) => {
    setinput(e.target.value);
    setshowdiv(true);
  };
  const closeModal = () => {
    setshowdiv(false);
  };
  const handleShowUser = (name) => {
    history.push(`/user/profile/${name}`);
  };
  const deconnect = () => {
    setisAuthenticated(false);
    dispatch(logout());
    history.push("/");
  };
  return (
    <div className="navigation">
      <nav
        className={`navbar  navbar-expand-lg   ${
          showPost ? "showPostActive" : "bg-white"
        }`}
      >
        <div className="container-fluid d-flex">
          <a className="navbar-brand" href="/home">
            <img src="/images/logo.png" alt=""></img>
          </a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="search ">
            <input
              className="form-control "
              defaultValue=""
              type="search"
              placeholder="&#xf002;  Rechercher"
              aria-label="Search"
              id="searchinput"
              onChange={handleInput}
            />
          </div>

          <div className="collapse navbar-collapse d-flex justify-content-sm-end">
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link fs-4 " to="/home">
                  <i class="fas fa-home"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fs-4 " to="/addpost">
                  <i class="fas fa-plus-circle "></i>
                </NavLink>
              </li>

              <li className="nav-item dropdown d-flex">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={user.Useravatar} className="avatar" alt=""></img>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    {" "}
                    <NavLink className="nav-link  text-black m-1" to="/profile">
                      {" "}
                      <i class="far fa-user-circle  fs-6"></i>{" "}
                      <span style={{ fontSize: 12, fontWeight: "bold" }}>
                        Profile
                      </span>{" "}
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {" "}
                    <Button className="deconnect_btn" onClick={deconnect}>
                  
                      <i class="far fa-user-circle  fs-6"></i>
                      <span style={{ fontSize: 12, fontWeight: "bold",marginLeft:5 }}>
                        Deconnexion
                      </span>{" "}
                    </Button>{" "}
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showdiv &&
        input !== "" &&
        users.find((element) =>
          element.username.toLowerCase().includes(input.toLowerCase())
        ) && (
          <div className=" searchres bg-white shadow">
            <button
              className="btn"
              style={{
                position: "absolute",
                right: 0,
                fontSize: 10,
                boxShadow: "none",
              }}
              onClick={closeModal}
            >
              close
            </button>
            <div className="mt-4">
              {" "}
              {input !== ""
                ? users
                    .filter((element) =>
                      element.username
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    )
                    .map((el) => {
                      return (
                        <button
                          className=" d-flex btn  searched_user mt-1"
                          onClick={() => handleShowUser(el.username)}
                        >
                          <img className="avatar" src={el.Useravatar} />

                          <p
                            style={{
                              fontSize: 15,
                              marginTop: 8,
                              marginLeft: 5,
                            }}
                          >
                            {" "}
                            {el.username}
                          </p>
                        </button>
                      );
                    })
                : null}
            </div>
          </div>
        )}
    </div>
  );
};

export default Nav;
