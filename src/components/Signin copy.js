import React, { useEffect } from "react";
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
import { useState } from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "./react-query/auth/useAuthUser";
import { useUsers } from "./react-query/users/useUsers";

// eslint-disable-next-line max-lines-per-function
const Signin = () => {
  const [email, setEmail] = useState("test");
  const [password, setPassword] = useState("test");
  const [dirty, setDirty] = useState({ email: false, password: false });
  const { auth, setAuthEmail, setAuthPassword } = useAuth;
  const { users } = useUsers();

  const handleSignIn = () => {
    console.log("login", auth)

  }

  useEffect(() => {
    setAuthEmail(email)
    setAuthPassword(password)
  },[email, password])


  // if (users) {
  //   return <Redirect to={`/user/${users.id}`} />;
  // }

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
                  onClick={(e) => handleSignIn(e)}
                >
                  Sign up
                </Button>
                <Button
                  type="submit"
                  isDisabled={!email || !password}
                  onClick={() => auth.signin(email, password)}
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
}

export default Signin;