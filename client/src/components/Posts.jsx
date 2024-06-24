import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Post from "./Post";
import { getPosts } from "../redux/action/post";

const Posts = ({ showPost, setshowPost }) => {
  const { posts } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const userid = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className={`bg-white   mb-4 ${showPost ? "showPostActive" : ""}`}>
      {posts
        .filter((el) => el.user !== userid)
        .map((element, key) => {
          return (
            <div
              className="row mt-3 d-flex justify-content-center "
              key={element._id}
            >
              <Post
                data={element}
                setshowPost={setshowPost}
                showPost={showPost}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
