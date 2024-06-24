import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserPassword, updateUserProfile } from "../redux/action/user";
import { ResetError, ResetMessage } from "../redux/action/auth";
import Success from "./Success";
import Error from "./Error";
const Editprofile = () => {
  // dispatch
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setshow] = useState("profile");
  const { message, error } = useSelector((state) => state.user);
  const [userProfile, setuserProfile] = useState({
    username: "",
    email: "",
    user: "",
    website: "",
    bio: "",
    phone: "",
  });
  useEffect(() => {
    setuserProfile(user);
  }, []);
  const handleChange = (e) => {
    dispatch(ResetError());
    dispatch(ResetMessage());
    setuserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };
  // password
  const [lastpassowrd, setlastpassowrd] = useState();
  const [newpassword, setnewpassword] = useState();
  const [confirmespassword, setconfirmespassword] = useState();
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const handleChangeLastPassword = (e) => {
    dispatch(ResetError());
    dispatch(ResetMessage());
    setlastpassowrd(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    dispatch(ResetError());
    dispatch(ResetMessage());
    setnewpassword(e.target.value);
  };
  const handleChangeCofirmedNewPassword = (e) => {
    dispatch(ResetError());
    dispatch(ResetMessage());
    setconfirmespassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ResetError());
    dispatch(ResetMessage());
    dispatch(updateUserProfile(user._id, userProfile));
  };
  const handleSubmitPassword = (e) => {
    dispatch(ResetError());
    dispatch(ResetMessage());
    e.preventDefault();

    dispatch(
      updateUserPassword(user._id, {
        lastpassowrd,
        newpassword,
        confirmespassword,
      })
    );
  };
  useEffect(() => {
    dispatch(ResetError());
    dispatch(ResetMessage());
  }, [dispatch]);

  return (
    <>
      <div className="editprofile ">
        <div className="col-md-8 offset-md-2 shadow bg-white d-flex edit">
          <div className="col-md-3  p-4 border border-right ">
            <button className="btn  mb-3" onClick={() => setshow("profile")}>
              Modifier profil
            </button>
            <button className="btn mb-3" onClick={() => setshow("pass")}>
              {" "}
              Changer mot de passe{" "}
            </button>
          </div>
          {show === "profile" ? (
            <div className="col-md-5 m-4 " style={{ marginLeft: "30px" }}>
              <div className="d-flex">
                <img
                  src={user && user.Useravatar}
                  className="avatar"
                  alt=""
                ></img>
                <div className="col username">
                  <h6 style={{ marginLeft: "13px", marginBottom: "0px" }}>
                    {user && user.username}{" "}
                  </h6>
                  <NavLink
                    className="nav-link fs-6 "
                    to="/editpicture"
                    style={{ color: "#049DD9", fontWeight: "600" }}
                  >
                    Modifier la photo de profil
                  </NavLink>
                </div>
              </div>
              <form className="formulaire" onSubmit={handleSubmit}>
                {/* Nom */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="form1Example1"
                    class="form-control"
                    defaultValue={user.username}
                    onChange={handleChange}
                  />
                </div>
                <p>
                  Aidez les gens à trouver votre compte à l’aide de votre nom le
                  plus connu, que ce soit votre nom complet, votre surnom ou
                  votre nom d’entreprise. Vous pouvez uniquement changer votre
                  nom deux fois tous les 14 jours.
                </p>
                {/* prenom */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example1">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    id="form1Example1"
                    class="form-control"
                    name="user"
                    defaultValue={user.user}
                    onChange={handleChange}
                  />
                </div>
                <p>
                  Dans la plupart des cas, vous pourrez reprendre votre nom
                  d’utilisateur radhiarahmanii pendant encore 14 jours.
                </p>
                {/* site web */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example1">
                    Site web
                  </label>
                  <input
                    type="text"
                    id="form1Example1"
                    name="website"
                    class="form-control"
                    defaultValue={user.website}
                    onChange={handleChange}
                  />
                </div>
                {/* Bio */}
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Bio
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="bio"
                    defaultValue={user.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {/* adress email */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example1">
                    Adresse Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={user.email}
                    id="form1Example1"
                    class="form-control"
                    onChange={handleChange}
                  />
                </div>
                {/* telephone */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example1">
                    Numéro de telephone
                  </label>
                  <input
                    type="text"
                    id="form1Example1"
                    class="form-control"
                    name="phone"
                    defaultValue={user.phone}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-primary " type="submit">
                  Envoyer
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="col-md-5 m-4 " style={{ marginLeft: "30px" }}>
                <div className="d-flex">
                  <img src={user.Useravatar} className="avatar" alt=""></img>

                  <h4 style={{ marginLeft: "13px", marginTop: "10px" }}>
                    {user.username}{" "}
                  </h4>
                </div>
                <form className="formulaire2" onSubmit={handleSubmitPassword}>

                  <div class="form-outline mt-5">
                    <label class="form-label m-2">Ancien mot de passe</label>
                    <input
                      type="password"
                      class="form-control m-2"
                      defaultValue=""
                      onChange={handleChangeLastPassword}
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label m-2">Nouveau mot de passe</label>
                    <input
                      type="password"
                      class="form-control m-2"
                      defaultValue=""
                      onChange={handleChangeNewPassword}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label m-2">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      defaultValue=""
                      class="form-control m-2"
                      onChange={handleChangeCofirmedNewPassword}
                    />
                  </div>

                
                  <div class="form-outline ">
                    <button
                      className="btn btn-primary"
                      id="editpassword"
                      type="submit"
                    >
                      Modifier le mot de passe
                    </button>
                  </div>
                  <label
                    class="form-label  m-5"
                    id="msgerror"
                    defaultValue=""
                    style={{ color: "red" }}
                  ></label>
                </form>
              </div>
            </>
          )}
        </div>

        {message && <Success message={message} />}
        {error && <Error message={error} />}
      </div>
    </>
  );
};

export default Editprofile;
