import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { followUser, getUsers } from "../redux/action/user";
import { getPosts } from "../redux/action/post";

import CheckIcon from "@mui/icons-material/Check";
import PostForm from "./PostForm";
import { unfollowUser } from "../redux/action/user";
const User = ({ showPost, setshowPost }) => {
  const { name } = useParams();

  const { users } = useSelector((state) => state.user);

  const [NumSuiv, setNumSuiv] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const user = useSelector((state) =>
    name ? state.user.users.find((element) => element.username === name) : null
  );

  const [post, setpost] = useState();
  const iduser = JSON.parse(localStorage.getItem("user"))._id;

  const follow = () => {
    dispatch(followUser(user._id, iduser));
  };
  const unfollow = () => {
    dispatch(unfollowUser(user._id, iduser));
  };
  const userPosts = useSelector((state) =>
    user ? state.postReducer.posts.filter((el) => el.user === user._id) : null
  );
  const numberPub = userPosts ? userPosts.length : 0;
  const numFollow = user && user.followers ? user.followers.length : 0;

  useEffect(() => {
    const suivis = users.filter((element) =>
      element.followers.find((el) => el.userid === user._id)
    );
    setNumSuiv(suivis);
  }, [users]);
  const handleShowPost = (data) => {
    setshowPost(true);
    setpost(data);
  };

  return (
    <div className="" style={{ position: "relative", zindex: 1 }}>
      <div className={` user ${showPost ? "showPostActive " : "bg-white"}`}>
        <Row className="d-flex justify-content-center ">
          <Col md={3} className="d-flex justify-content-end">
            <img
              className="avatar bg-white"
              src={user && user.Useravatar}
              alt=""
            />
          </Col>
          <Col md={5} style={{ marginLeft: 20 }}>
            <Row className="mt-4">
              <Col className="d-flex justify-content-start">
                <h4>{user && user.username}</h4>
                <Button
                  className="btn_follow"
                  style={{ width: "120px" }}
                  onClick={
                    user.followers &&
                    user.followers.length > 0 &&
                    user.followers.find((el) => el.userid === iduser)
                      ? unfollow
                      : follow
                  }
                >
                  {user.followers &&
                  user.followers.length > 0 &&
                  user.followers.find((el) => el.userid === iduser) ? (
                    <>
                      Suivi(e) <CheckIcon />
                    </>
                  ) : (
                    "Suivre"
                  )}
                </Button>
              </Col>
            </Row>
            <Row className="mt-4 ">
              <Col>{numberPub} Publication(s)</Col>
              <Col> {numFollow} Follower(s)</Col>
              <Col>{NumSuiv.length} Suivie(s)</Col>
            </Row>
            <Row className="mt-4 ">
              <Col>{user && user.user}</Col>
            </Row>
          </Col>
        </Row>
        <hr></hr>
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex">
            {userPosts &&
              userPosts.map((element) => {
                return (
                  <div className="col m-3" md={4}>
                    <img
                      width={300}
                      height={300}
                      src={element.imag_url}
                      alt=""
                      onClick={() => handleShowPost(element)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {showPost && <PostForm data={post} setshowPost={setshowPost} />}
    </div>
  );
};

export default User;
