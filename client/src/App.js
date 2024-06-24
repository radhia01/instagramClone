import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import Description from "./components/Description";
import Login from "./components/Login";
import Editprofile from "./components/EditProfile";
import EditPhoto from "./components/EditPhoto";
import Register from "./components/Register";
import User from "./components/User";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";

function App() {
  const [showPost, setshowPost] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated"))
  );
  console.log(isAuthenticated);
  return (
    <>
      {/* */}
      {isAuthenticated && (
        <Nav showPost={showPost} setisAuthenticated={setisAuthenticated} />
      )}

      <Switch>
        <Route
          exact
          path="/"
          render={() => <Login setisAuthenticated={setisAuthenticated} />}
        />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/user/profile/:name"
          render={(props) => {
            return isAuthenticated ? (
              <User {...props} showPost={showPost} setshowPost={setshowPost} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route exact path="/addpost" component={AddPost} />
        <Route
          exact
          path="/profile"
          render={(props) => {
            return isAuthenticated ? (
              <Profile
                {...props}
                showPost={showPost}
                setshowPost={setshowPost}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          exact
          path="/home"
          render={(props) => {
            return isAuthenticated ? (
              <Posts {...props} showPost={showPost} setshowPost={setshowPost} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <PrivateRoute exact path="/showpt/:id" component={Description} />
        <PrivateRoute exact path="/editprofile" component={Editprofile} />
        <PrivateRoute exact path="/editpicture" component={EditPhoto} />
      </Switch>
    </>
  );
}

export default App;

