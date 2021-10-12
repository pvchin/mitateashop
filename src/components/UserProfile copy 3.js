/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useUsers } from "./react-query/users/useUsers";
import { useUpdateUser } from "./react-query/users/useUpdateUser";
import { user_localstorage_key } from "../utils/constants";

const initial_values = {
  name: "",
  email: "",
  phone: "",
};

export default function UserProfile() {
  const history = useHistory();
  const useUser = createLocalStorageStateHook(user_localstorage_key, []);
  const [localuser, setLocalUser] = useUser();
  const [state, setState] = useState(initial_values);
  const { users, setUserId } = useUsers();
  const updateUser = useUpdateUser();
  const { name, email, phone } = state;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: state.name,
      phone: state.phone,
      email: state.email,
    },
  });

  useEffect(() => {
    setUserId(localuser.token);
  }, []);

  useEffect(() => {
    setState({ ...users[0] });
    console.log("state", state);
  }, [users]);

  if (!users) {
    return <Redirect to="/signin" />;
  }

  function handleChange(e) {
    console.log("e", e.target)
    e.preventDefault();
    const { name, type, value } = e.target;
    setState({ ...state, [name]: value });
  }

  function onSubmit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        //alert(JSON.stringify(values, null, 2));
       
        const { id, name, email, phone } = state;
        updateUser({ id: id, name: name, phone: phone });
        resolve();
      }, 3000);
      history.push("/");
    });
  }

  return (
    <Flex minH="84vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" w="xl" py={12} px={6}>
        <Stack align="center">
          <Heading>Your information</Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <form onSubmit={onSubmit}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                name="name"
                value={name}
                defaultValue={name}
                placeholder="name"
                onChange={(e) => handleChange(e)}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                isReadOnly
                id="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={(e) => handleChange(e)}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.phone}>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <Input
                isRequired
                id="phone"
                name="phone"
                value={phone}
                placeholder="6731234567"
                onChange={(e) => handleChange(e)}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
          {/* <Formik
            enableReinitialize
            initialValues={{
              name: user?.name ?? "",
              address: user?.address ?? "",
              phone: user?.phone ?? "",
            }}
            onSubmit={(values: FormValues) => {
              patchUser({ ...user, ...values });
            }}
          >
            <Form>
              {formElements.map((element) => (
                <FormControl key={element} id={element}>
                  <FormLabel>{element}</FormLabel>
                  <Field name={element} as={Input} />
                </FormControl>
              ))}
              <Button mt={6} type="submit">
                Update
              </Button>
            </Form>
          </Formik> */}
        </Box>
      </Stack>
    </Flex>
  );
}
