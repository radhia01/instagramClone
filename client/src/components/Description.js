import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPosts } from "../redux/action/post";

const Description = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const state = useSelector((state) => state.reducer);
  const { posts } = useSelector((state) => state.postReducer);
 
  useEffect(() => {
    dispatch(getPosts);
  }, [dispatch]);
  const closeModal = () => {
    history.push("/profile");
  };
  return (
    <div className="description m-4">
      
      <div className="d-flex post">
        {posts &&
          posts
            .filter((post) => post._id === id)
            .map((element) => {
              return (
                <>
                  <div
                    className=" d-flex col-md-6 "
                    style={{ position: "relative" }}
                  >
                    <img src={element.imag_url} alt=""></img>
                    
                  </div>
                  <div className="col-md-6 ">
                    <div className="d-flex m-2">
                      <img
                        src={user.Useravatar}
                        className="avatar "
                        alt=""
                      ></img>
                      <div className="col-md-4 m-2">
                        <h6>{user.username}</h6>
                      </div>
                    </div>
                    <div className=" trait">
                      <hr />
                    </div>{" "}
                    <div className="d-flex m-2 ">
                      <img
                        src={user.Useravatar}
                        className="avatar "
                        alt=""
                      ></img>{" "}
                      <div className="  d-flex mt-2">
                        <strong> {state.User.userName}</strong>
                        <p> {element.caption}</p>
                      </div>
                    </div>
                  </div>{" "}
                </>
              );
            })}

        <div className="col-md-2">
          <button onClick={closeModal} className="btn ">
            {" "}
            <i class="fas fa-times fs-4"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
