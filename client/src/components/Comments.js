import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../redux/action/user";
import { getPosts } from "../redux/action/post";
import { useEffect } from "react";

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const user =JSON.parse( localStorage.getItem("user"));

  const { users } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="comment">
      <div className="row  mt-3" style={{ paddingLeft: "19px" }}>
        {post.comment && post.comment.length > 0 ? (
          post.comment.map((comm) => {
            return (
              <div key={comm._id}>
                <p className="text_comment" style={{ fontSize: "14px" }}>
                  {users
                    .filter((el) => el._id === comm.user)
                    .map((el) => {
                      return (
                        <div className="d-flex">
                          <img src={el.Useravatar} alt="" className="avatar" />
                          <div className="fw-bold">{user && el.username===user.username?"Vous":el.username}</div>{" "}
                          <div className="" style={{ marginLeft: 10 }}>
                            {comm.content}
                          </div>
                        </div>
                      );
                    })}{" "}
                </p>
              </div>
            );
          })
        ) : (
          <h4 className="fw-bold mt-4">Aucun commentaire pour l’instant</h4>
        )}
      </div>
    </div>
  );
};

export default Comments;
