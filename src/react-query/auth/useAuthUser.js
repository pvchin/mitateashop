import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { createLocalStorageStateHook } from "use-local-storage-state";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { authuser_localstorage_key } from "../../utils/constants";
import { queryKeys } from "../constants";
import { firebase_auth } from "../../utils/firebase";

//async function getUser(user) {
//if (!user) return null;
// const { data } = await axiosInstance.get(`/user/${user.id}`, {
//   headers: getJWTHeader(user),
// });
//return data.user;
//const { data } = await axios.get(`${users_url}?tk=${user.token}`);
//return authuser;
//}

export function useAuthUser() {
  const useMAuthUser = createLocalStorageStateHook(
    authuser_localstorage_key,
    []
  );
  const [mauthuser, setMAuthUser] = useMAuthUser();
  const [authuser, setAuthUser] = useState(mauthuser);
  const queryClient = useQueryClient();

  // TODO: call useQuery to update user data from server
  useQuery(queryKeys.authuser, () => getAuthUser(authuser), {
    enabled: !!authuser,
    onSuccess: (data) => setAuthUser(data),
  });

  // meant to be called from useAuth
  function getAuthUser(data) {
    if (!authuser) return null;

    // set user in state
    return mauthuser;
  }

  // meant to be called from useAuth
  function updateAuthUser(newUser) {
    // set user in state
    setAuthUser(newUser);

    // update user in localstorage
    //setMAuthUser(newUser);

    // pre-populate user profile in React Query client
    queryClient.setQueryData(queryKeys.authuser, newUser);
    //window.location.reload();
  }

  // meant to be called from useAuth
  function clearAuthUser() {
    // update state
    setAuthUser(null);

    // signout firebase
    signOut(firebase_auth);
    window.location.reload();

    // remove from localstorage
    setMAuthUser([]);

    // reset user to null in query client
    queryClient.setQueryData(queryKeys.user, null);

    // remove user appointments query
    //queryClient.removeQueries("user-appointments");
  }

  return { authuser, updateAuthUser, clearAuthUser };
}
