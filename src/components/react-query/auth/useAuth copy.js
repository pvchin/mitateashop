import { useCustomToast } from "../../helpers/useCustomToast";
import { useUser } from "../users/useUsers";

import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { users_url } from "../../../utils/constants";
import App from "../../../utils/firebase";

import axios from "axios";
import { queryKeys } from "../constants";

export function useAuth() {
  const toast = useCustomToast();
  const [authemail, setAuthEmail] = useState("");
  const [authpassword, setAuthPassword] = useState("");

  const fallback = [];
  const { data: auth = fallback } = useQuery([queryKeys.auth], () =>
    getAuth(authemail, authpassword)
  );

  async function getAuth(email, password) {
    //const { data } = await axios.get(`${items_url}`);
    try {
      // await Auth.auth().signInWithEmailAndPassword(
      //   email,
      //   password
      // );
      // const user = Auth.auth().currentUser.email;
      // console.log("auth", Auth.auth().currentUser.email);
      const user = await App
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("user", user);
     
      toast({
        title: "Sign In successfully!",
        status: "success",
      });
      return user;

      //history.pushState("/");
    } catch (error) {
      toast({
        title: "Invalid email or password!",
        status: "warning",
      });
    }
  }

  return { auth, setAuthEmail, setAuthPassword };
}
