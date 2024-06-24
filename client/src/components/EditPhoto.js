import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { updateImageProfile } from "../redux/action/user";
const Editphoto = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const inputFile = useRef(null);
  const history = useHistory();
  const [inputfile, setinputfile] = useState();
  const [showModal, setshowModal] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("image", inputfile);
    data.append("user", user._id);
    dispatch(updateImageProfile(data));
    history.push("/profile");
  };

  const openfileDialog = () => {
    inputFile.current.click();
  };
  useEffect(() => {
    if (inputfile) {
      setshowModal(true);
    }
  }, [inputfile]);
  const closeModal = () => {
    setshowModal(false);
  };
  return (
    <div className="editphoto  col-md-3 offset-md-4 ">
      <div className=" card photo">
        <div className="card-header bg-white">
          <h5> Modifier la photo de profil</h5>
        </div>
        <div className="card-body"></div>
        <ul className="list-group">
          <li className="list-group-item">
            <input
              type="file"
              ref={inputFile}
              id="fileLoader"
              onChange={(e) => setinputfile(e.target.files[0])}
            />
            <input
              type="button"
              className="btn bg-white"
              id="import"
              value="Importer une photo"
              onClick={() => openfileDialog()}
            />
          </li>

          <li className="list-group-item">
            <NavLink to="/profile" id="annuler">
              Annuler
            </NavLink>
          </li>
        </ul>
      </div>
      {showModal && (
        <div className="card  " style={{ position: "fixed", top: 80 }}>
          <div className="card-header fw-bold" style={{ fontSize: 13 }}>
            Votre image sera mise à jour
          </div>
          <div className="card-body">
            <button className="btn confirm_btn" onClick={handleSubmit}>
              Confirmer
            </button>
            <button className="btn confirm_btn" onClick={closeModal}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editphoto;
