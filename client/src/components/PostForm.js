import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getUsers } from "../redux/action/user";
import { getPosts } from "../redux/action/post";
import Comments from "./Comments";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { addComment, likePost } from "../redux/action/post";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deletePost, updatePost } from "../redux/action/post";
function PostForm({ data, setshowPost }) {
  const dispatch = useDispatch();
  const [isEditing, setisEditing] = useState(false);
  const [newInput, setnewInput] = useState("");
  const user = useSelector((state) =>
    data ? state.user.users.find((el) => el._id === data.user) : null
  );
  const userInfo=JSON.parse(localStorage.getItem("user"))

  const post = useSelector((state) =>
    data ? state.postReducer.posts.find((el) => el._id === data._id) : null
  );
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const [input, setinput] = useState("");
  const { users } = useSelector((state) => state.user);
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const addLike = () => {
    const id = post && post._id;
    dispatch(likePost(id, userid));
  };
  const addcommentaire = () => {
    dispatch(addComment(post._id, input, userid));
    setinput("");
  };
  const closeModal = () => {
    setshowPost(false);
  };
  const handleButton = () => {
    document.getElementById("myInput").focus();
  };
  const deleteUserPost = (id) => {
    dispatch(deletePost(id));
    setshowPost(false);
  };
  const closeDeleteModal = () => {
    setshowDeleteModal(false);
  };
  const handleEditClick = () => {
    setisEditing(true);
    setshowDeleteModal(false);
  };
  const handleUpdatePost = () => {
    dispatch(updatePost(post._id, newInput));
    setisEditing(false);
  };
  return (
    <div className="">
      <div className="d-flex postform  shadow">
        <button className=" btn   close" onClick={closeModal}>
          <CloseIcon />
        </button>

        <div className="col-md-5  d-flex divimage ">
          <img src={post.imag_url} alt=""></img>
        </div>
        <div className="col-md-4  bg-white">
          <div
            className="header text-black  bg-white "
            style={{ position: "relative" }}
          >
            <img
              src={user.Useravatar}
              className="avatar"
              alt=""
              style={{ marginTop: 10 }}
            />
            <p className="mt-3 fw-bold" style={{ fontSize: 12 }}>
              {user && user.username}
            </p>
            <button
              className="btn d-flex jutsify-content-center align-items-center bg-white border-white"
              onClick={() => setshowDeleteModal(true)}
              style={{
                position: "absolute",
                right: 8,
                top: 13,
                height: 20,
              }}
            >
              <MoreHorizIcon />
            </button>
          </div>
          <hr></hr>
          <div className="row">
            {users
              .filter((el) => el._id === post.user)
              .map((user) => {
                return (
                  <div className="d-flex">
                    <img
                      className="avatar"
                      src={user.Useravatar}
                      style={{ marginLeft: 13 }}
                      alt=""
                    />
                    <p
                      style={{ fontSize: 15, display: "flex ", marginLeft: 2 }}
                    >
                      <span className="fw-bold mt-1 " style={{ fontSize: 12 }}>
                        {user.username}
                      </span>{" "}
                      {isEditing ? (
                        <div className="d-flex">
                          <input
                            style={{
                              marginLeft: 10,
                              marginTop: 1,
                              color: "black",
                            }}
                            defaultValue={post.caption}
                            onChange={(e) => setnewInput(e.target.value)}
                          />
                          <button
                            className="btn confirm_edit"
                            onClick={handleUpdatePost}
                          >
                            terminé
                          </button>
                        </div>
                      ) : (
                        <span style={{ marginLeft: 10, marginTop: 1 }}>
                          {post.caption}
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
          </div>

          <Comments post={post} />
          <div className="d-flex">
            <button className="like  " onClick={addLike}>
              {" "}
              {post &&
              post.likes &&
              post.likes.length > 0 &&
              post.likes.find((el) => el.user === userInfo._id) ? (
                <FavoriteIcon className="text-danger" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
            <button className="like" onClick={handleButton}>
              {" "}
              <ChatBubbleOutlineIcon
                className="mt-2"
                style={{ marginRight: 10 }}
              />
            </button>
            <div className="mt-3 d-flex">
              {post &&
              post.likes.length === 1 &&
              post.likes.find((el) => el.user === userInfo._id) ? (
                <p className="like_txt">vous , aimez ça </p>
              ) : post.likes.length === 1  &&  !post.likes.find((el) => el.user === user._id) ?(
                users
                  .filter((element) => element._id === post.likes[0].user)
                  .map((user) => {
                    return <p className="like_txt">{user.username} aime ça </p>;
                  })
              ) : null}

              {post.likes.length > 1 &&
                users
                  .filter((element) => element._id === post.likes[0].user)
                  .map((el) => {
                    return (
                      <p className="like_txt">
                        {el.username === user.username ? "Vous" : el.username}
                      </p>
                    );
                  })}
              {post.likes.length > 1 && (
                <div style={{ marginRight: 3, marginLeft: 3 }}>
                  <p className="like_txt">et</p>
                </div>
              )}
              <p className="like_txt">
                {" "}
                {post.likes.length > 1 &&
                  post.likes
                    .filter((like, index) => index !== 0)
                    .reduce((accumulator) => accumulator + 1, 0)}
              </p>
              {post.likes.length > 1 && (
                <div style={{ marginLeft: 3 }}>
                  <p className="like_txt">autres aiment ça </p>
                </div>
              )}
            </div>
          </div>
          <div className="row  mt-3" style={{ height: 50 }}>
            <div className="d-flex">
              <input
                className="form-control m-1 "
                value={input}
                id="myInput"
                onChange={(event) => setinput(event.target.value)}
                // id={props.post.id}
                type="text"
                placeholder=" Ajouter un commentaire...."
              ></input>
              <button
                className=" bg-white bt bt_share"
                onClick={addcommentaire}
              >
                Publier
              </button>
            </div>
          </div>
          <hr></hr>
        </div>
        {showDeleteModal && (
          <div className="  shadow  col-3 deleteModal">
            <div className="d-flex justify-content-center">
              <button
                className="btn delete_btn text-danger"
                onClick={() => deleteUserPost(post._id)}
              >
                supprimer
              </button>
            </div>
            <hr></hr>
            <div className="d-flex justify-content-center">
              {" "}
              <button
                className="btn update_btn text-danger"
                onClick={handleEditClick}
              >
                modifier
              </button>
            </div>
            <hr></hr>

            <div className="d-flex justify-content-center">
              {" "}
              <button
                className="btn reset_btn text-danger"
                onClick={closeDeleteModal}
              >
                annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostForm;
