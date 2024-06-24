import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPosts } from "../redux/action/post";
import { getPosts } from "../redux/action/post";
import PostForm from "./PostForm";
import { getUsers } from "../redux/action/user";
const Profile = ({ showPost, setshowPost }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [post, setpost] = useState();
  const [showFromProfile, setshowFromProfile] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postReducer);
  const { users } = useSelector((state) => state.user);
  const [nbabonnement, setnbabonnement] = useState([]);
  useEffect(() => {
    dispatch(getUserPosts(user._id));
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, posts]);
  const userPosts = useSelector((state) =>
    state.postReducer.posts.filter((post) => post.user === user._id)
  );
  const nbfollowers = user.followers ? user.followers.length : 0;
  let nb = [];

  const history = useHistory();

  const show = (el) => {
    setshowPost(true);
    setshowFromProfile(true);
    setpost(el);
  };
  const editprofile = () => {
    history.push("/editprofile");
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    const t = users.filter((element) =>
      element.followers.find((follow) => follow.userid === user._id)
    );
    setnbabonnement(t);
  }, []);

  return (
    <>
      <div className={`profile   ${showPost ? "showPostActive " : "bg-white"}`}>
        {/* <button className=" btn   close" onClick={closeModal}>
          close
        </button> */}
        <div className="row head  ">
          <div className="col-md-4">
            <img src={user.Useravatar} className="avatar" alt=""></img>
          </div>
          <div className="col-md-7 ">
            <div className="row d-flex mb-4">
              <div className="col-md-4">
                <h5>{user.username.toLowerCase()}</h5>
              </div>{" "}
              <div className="col-md-3">
                <button
                  className="btn btn-light modifier_profile p-1 "
                  onClick={() => editprofile()}
                >
                  {" "}
                  Modifier Profil
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex">
                <p>
                  <strong>{userPosts && userPosts.length}</strong> publications
                </p>
              </div>
              <div className="col">
                <p>
                  <strong>{nbfollowers}</strong> abonnées
                </p>
              </div>
              <div className="col">
                <p>
                  <strong>{nbabonnement.length}</strong> abonnements
                </p>
              </div>
            </div>
            <div className="row" style={{ width: "50%" }}>
              <p>
                <strong>{user.user}</strong>
                <br />
                {user.bio}
              </p>
            </div>
          </div>
        </div>
        <hr className="trait" />
        <div className="d-flex justify-content-center">
          <div
            className={`row  d-flex m-4 ${
              showPost ? "showPostActive " : "bg-white"
            }`}
            style={{
              marginTop: 50,
              width: "90%",
            }}
          >
            {posts &&
              userPosts.map((element) => {
                return (
                  <div
                    className="col-md-3 image m-4"
                    key={element._id}
                    onClick={() => show(element)}
                  >
                    <img src={element.imag_url} alt="" />
                  </div>
                );
              })}
          </div>
        </div>

        {showPost && (
          <PostForm
            data={post}
            setshowPost={setshowPost}
            showFromProfile={showFromProfile}
            setshowFromProfile={setshowFromProfile}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
