import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost } from "../redux/action/post";
const Addpost = () => {
  const [inputfile, setinputfile] = useState();
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [text, settext] = useState();
  const datePub = new Date();
  const history = useHistory();
  const dispatch = useDispatch();
  const handle = () => {
    history.push("/profile");
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("image", inputfile);
    data.append("user", userId);
    data.append("caption", text);
    data.append("datePub", datePub);
    dispatch(addPost(data));
    history.push("/profile");
  };

  return (
    <>
      <div className="newpost ">
        <div className="col-md-4 offset-md-4 pt-2 addpost">
          <h6 className="text-center ">
            {" "}
            Créer une nouvelle Publication{" "}
            <button onClick={() => handle()} className="btn bt1">
              {" "}
              <i class="fas fa-times fs-4 "></i>
            </button>
          </h6>
          <hr className="mt-4 mb-4"></hr>
          <textarea
            className="form-control"
            placeholder="Exprimez vous ....."
            onChange={(event) => settext(event.target.value)}
          />
          <input
            className="form-control addimage"
            onChange={(e) => setinputfile(e.target.files[0])}
            id="customFile"
            type="file"
          />{" "}
          <button className="btn btn-primary bt " onClick={handleSubmit}>
            Ajouter{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Addpost;
