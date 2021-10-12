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
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useUsers } from "../react-query/users/useUsers";
import { useUpdateUser } from "../react-query/users/useUpdateUser";
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
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: state });

  useEffect(() => {
    setUserId(localuser.token);
  }, []);

  useEffect(() => {
    setState({ ...users[0] });
    reset({ ...users[0] });
    console.log("state", state);
  }, [users, reset]);

  if (!users) {
    return <Redirect to="/signin" />;
  }

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        const { name, email, phone } = values;
        const { id } = state;
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <VStack alignItems="flex-start">
                <Controller
                  control={control}
                  name="email"
                  //defaultValue={email}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      name="email"
                      value={value}
                      onChange={onChange}
                      //textTransform="capitalize"
                      ref={ref}
                      placeholder="email"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="name"
                  //defaultValue={name}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      name="name"
                      value={value}
                      onChange={onChange}
                      textTransform="capitalize"
                      //ref={ref}
                      placeholder="name"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="phone"
                  //defaultValue={phone}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      name="phone"
                      value={value}
                      onChange={onChange}
                      textTransform="capitalize"
                      ref={ref}
                      placeholder="phone"
                    />
                  )}
                />
              </VStack>
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
