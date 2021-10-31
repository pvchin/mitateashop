import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useUserContext } from "../context/user_context";
import { useAuthUser } from "../react-query/auth/useAuthUser";
import { useUsers } from "../react-query/users/useUsers";

const PrivateAdminRoute = ({ children, ...rest }) => {
  const { authuser } = useAuthUser();
  const { users } = useUsers();
  console.log("authuser", authuser)
  console.log("users", users)
  return (
    <Route
      {...rest}
      render={() => {
        return authuser &&
          authuser.length > 0 &&
          users &&
          users.length > 0 &&
          users[0].email === authuser[0].email &&
          users[0].role === "1" ? (
          children
        ) : (
          <Redirect to="/"></Redirect>
        );
      }}
    ></Route>
  );
};
export default PrivateAdminRoute;
