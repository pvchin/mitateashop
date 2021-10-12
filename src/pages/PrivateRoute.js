import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useUserContext } from "../context/user_context";
import { useAuthUser } from "../components/react-query/auth/useAuthUser";

const PrivateRoute = ({ children, ...rest }) => {
  const { authuser } = useAuthUser()

  return (
    <Route
      {...rest}
      render={() => {
        return authuser && authuser.length > 0 ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
