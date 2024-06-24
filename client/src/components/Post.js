import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useState, useEffect } from "react";
import Comments from "./Comments";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { getUsers } from "../redux/action/user";
import {
  addComment,
  deletePost,
  getPosts,
  likePost,
} from "../redux/action/post";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Post = ({ data, setshowPost, showPost }) => {
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const post = useSelector((state) =>
    data ? state.postReducer.posts.find((el) => el._id === data._id) : null
  );
  console.log(post.likes.length)
  const user = JSON.parse(localStorage.getItem("user"));
  
  const history = useHistory();
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const [input, setinput] = useState("");

  const addLike = () => {
    const id = post && post._id;
    const userid = user && user._id;
    dispatch(likePost(id, userid));
  };
  const addcommentaire = () => {
    dispatch(addComment(post._id, input, user._id));
    setinput("");
  };
  const goToUser = (element) => {
    history.push(`/user/profile/${element}`);
  };
  const handleButton = () => {
    document.getElementById("myInput").focus();
  };
  return (
    <div className="col-md-4   bg-white post  border p-3 mb-4">
      <div className=" header_post ">
        {users
          .filter((el) => el._id === post.user)
          .map((element) => {
            return (
              <div className="d-flex" style={{ position: "relative" }}>
                <img
                  src={element.Useravatar}
                  className="avatar m-2"
                  alt=""
                ></img>
                <button
                  className=" btn username fw-bold"
                  onClick={() => goToUser(element.username)}
                >
                  {element.username}
                </button>
                <button
                  className="btn bg-white border-white d-flex jutsify-content-center align-items-center"
                  onClick={() => setshowDeleteModal(true)}
                  style={{ position: "absolute", right: 0, top: 8, height: 20 }}
                >
                  <MoreHorizIcon />
                </button>
              </div>
            );
          })}
      </div>
      <div className="row">
        {/* image */}
        <img src={post && post.imag_url} alt=""></img>
      </div>
      {/* username+caption */}
      <div className="d-flex">
        <button className="like  " onClick={addLike}>
          {" "}
          {post &&
          post.likes &&
          post.likes.length > 0 &&
          post.likes.find((el) => el.user === user._id) ? (
            <FavoriteIcon className="text-danger" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>
        <button className="like" onClick={handleButton}>
          {" "}
          <ChatBubbleOutlineIcon className="mt-2" style={{ marginRight: 10 }} />
        </button>
        <div className="mt-3 d-flex">
          {post &&
          post.likes.length === 1 &&
          post.likes[0].user===user._id ? (
            <p className="like_txt">vous , aimez ça </p>
          ) :  post.likes.length===1 &&   post.likes[0].user!==user._id  ? <p className="like_txt">{users.find(user=>user._id===post.likes[0].user).username} aime ca </p>
             :"" }

          {post.likes.length > 1 && post.likes.find(post=>post.user===user._id)?
          "Vous": post.likes.length>1  && !post.likes.find(post=>post.user===user._id)?
            users
              .filter((element) => element._id === post.likes[0].user )
              .map((el) => {
                return (
                  <p className="like_txt">
                    {el.username}
                  </p>
                );
              }):""}
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
      <div className="row">
        <h5 className="text_post">
          <strong>
            {users
              .filter((el) => el._id === post.user)
              .map((user) => {
                return user.username;
              })}
          </strong>{" "}
          :<span>{post.caption}</span>
        </h5>
      </div>
      <Comments post={data} />
      <div className="row ">
        <div className="d-flex">
          <input
            className="form-control   "
            value={input}
            id="myInput"
            onChange={(event) => setinput(event.target.value)}
            type="text"
            placeholder=" Ajouter un commentaire...."
          ></input>
          <button className=" bg-white bt bt_share" onClick={addcommentaire}>
            Publier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
