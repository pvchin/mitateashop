import React, { useState, useEffect, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { createLocalStorageStateHook } from "use-local-storage-state";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { authuser_localstorage_key } from "../utils/constants";
import { useCustomToast } from "../helpers/useCustomToast";
import { useAuthUser } from "../react-query/auth/useAuthUser";
import { useUsers } from "../react-query/users/useUsers";
import { useCreateUser } from "../react-query/users/useCreateUser";
import { firebase_auth } from "../utils/firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

// eslint-disable-next-line max-lines-per-function
const Signin = () => {
  const toast = useCustomToast();
  const history = useHistory();
  const useLocalUser = createLocalStorageStateHook(
    authuser_localstorage_key,
    []
  );
  const [localuser, setLocalUser] = useLocalUser();
  const { authuser, updateAuthUser } = useAuthUser();
  const [state, setState] = useState({ ...INITIAL_STATE });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authentication, setAuthentication] = useState(false);
  const [dirty, setDirty] = useState({ email: false, password: false });
  const { users, setUserId } = useUsers();
  const addUser = useCreateUser();
  const [isLoad, setIsLoad] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();

    await createUserWithEmailAndPassword(firebase_auth, email, password)
      .then((userCredential) => {
        // Signed in
        const {
          user: { uid },
        } = userCredential;
        CreateUser(uid, email);
        updateAuthUser({ token: uid, email: email });
        setLocalUser({ token: uid, email: email, role: 0 });
        setUserId(email);
        toast({
          title: "Sign Up successfully!",
          status: "success",
        });
        history.push("/user");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log("error code", errorCode, errorMessage);
        var errmsg = "";
        if (errorCode === "auth/email-already-in-use") {
          errmsg = "Email already existed!";
        } else {
          errmsg = errorCode;
        }
        toast({
          title: "SignUp Error! " + errmsg,
          status: "warning",
        });
      });
  }

  async function handleLogin(e) {
    e.preventDefault();
    //console.log("login", email, password);

    await signInWithEmailAndPassword(firebase_auth, email, password)
      .then((userCredential) => {
        // Signed in
        const {
          user: { uid },
        } = userCredential;
        GetUser(uid, email);
        setLocalUser({ email: email, token: uid });

        toast({
          title: "Sign In successfully!",
          status: "success",
        });

        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error.code, error.Message);
        var errmsg = "";
        if (errorCode === "auth/user-not-found") {
          errmsg = "Email not found!";
        } else {
          errmsg = errorCode;
        }
        toast({
          title: "SignIn Error! " + errmsg,
          status: "warning",
        });
      });
  }

  const CreateUser = (uid, email) => {
    console.log("create", uid, email);
    addUser({ email: email, token: uid, role: 0 });
  };

  const GetUser = (uid, email) => {
    setAuthentication(true);
    setLocalUser([{ email: email, token: uid }]);
    updateAuthUser({ email: email, token: uid });
    setUserId(email);
  };

  if (authuser.length > 1) {
    return <Redirect to={`/user`} />;
  }

  return (
    <>
      <Flex minH="84vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading>Sign in to your account</Heading>
          </Stack>
          <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <FormControl
                id="email"
                isRequired
                isInvalid={!email && dirty.email}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setDirty((prevDirty) => ({ ...prevDirty, email: true }))
                  }
                />
                <FormErrorMessage>Email may not be blank</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isRequired
                isInvalid={!password && dirty.password}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setDirty((prevDirty) => ({ ...prevDirty, password: true }))
                  }
                />
                <FormErrorMessage>Password may not be blank</FormErrorMessage>
              </FormControl>
              <HStack spacing={2} width="100%">
                <Button
                  variant="outline"
                  type="submit"
                  isDisabled={!email || !password}
                  onClick={(e) => handleSignUp(e)}
                >
                  Sign up
                </Button>
                <Button
                  type="submit"
                  isDisabled={!email || !password}
                  onClick={(e) => handleLogin(e)}
                >
                  Sign in
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Signin;
