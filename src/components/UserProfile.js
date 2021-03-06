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
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useUsers } from "../react-query/users/useUsers";
import { useUpdateUser } from "../react-query/users/useUpdateUser";
import { user_localstorage_key } from "../utils/constants";
import { useAuthUser } from "../react-query/auth/useAuthUser";
import { useAreas } from "../react-query/area/useAreas";

const initial_values = {
  name: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  area: "",
};

export default function UserProfile() {
  const history = useHistory();
  const field_width = "40";
  const useUser = createLocalStorageStateHook(user_localstorage_key, []);
  const { users, setUserId } = useUsers();
  const { areas } = useAreas();
  const [state, setState] = useState(initial_values);
  const { authuser } = useAuthUser();
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
    setUserId(authuser[0].token);
  }, []);

  useEffect(() => {
    setState({ ...users[0] });
    reset({ ...users[0] });
  }, [reset]);

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //alert(JSON.stringify(values, null, 2));
        const { name, email, phone, address1, address2, area } = values;
        const { id } = state;
        updateUser({
          id: id,
          name: name,
          phone: phone,
          address1: address1,
          address2: address2,
          area: area,
        });
        resolve();
      }, 3000);
      history.push("/");
    });
  }

  if (!authuser.length === 0) {
    return <Redirect to="/signin" />;
  }

  return (
    <Flex minH="84vh" align="center" justify="center">
      <Stack
        spacing={8}
        mx="auto"
        w={{ base: "auto", md: "xl" }}
        py={12}
        px={{ base: "1", md: "6" }}
      >
        <Stack align="center">
          <Heading>Your information</Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: "1", md: "8" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack alignItems="flex-start">
              <FormControl>
                <Controller
                  control={control}
                  name="email"
                  //defaultValue={email}

                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          fontSize={{ base: "sm", md: "md" }}
                          children="Email"
                          minWidth={{ base: "auto", md: field_width }}
                        />

                        <Input
                          isReadOnly
                          p={1}
                          size={{ base: "sm", md: "md" }}
                          name="email"
                          value={value}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="email"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="name"
                  //defaultValue={name}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Name"
                          fontSize={{ base: "sm", md: "md" }}
                          minWidth={{ base: "auto", md: field_width }}
                        />
                        <Input
                          name="name"
                          p={1}
                          size={{ base: "sm", md: "md" }}
                          value={value}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="name"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="phone"
                  //defaultValue={phone}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Phone"
                          fontSize={{ base: "sm", md: "md" }}
                          minWidth={{ base: "auto", md: field_width }}
                        />
                        <Input
                          name="phone"
                          p={1}
                          size={{ base: "sm", md: "md" }}
                          value={value}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="phone"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="address1"
                  //defaultValue={phone}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Address"
                          fontSize={{ base: "sm", md: "md" }}
                          minWidth={{ base: "auto", md: field_width }}
                        />
                        <Input
                          name="address1"
                          value={value}
                          p={1}
                          size={{ base: "sm", md: "md" }}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="address1"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="address2"
                  //defaultValue={phone}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Address"
                          fontSize={{ base: "sm", md: "md" }}
                          minWidth={{ base: "none", md: field_width }}
                        />
                        <Input
                          name="address2"
                          value={value}
                          p={1}
                          size={{ base: "sm", md: "md" }}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="address2"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="area"
                  //defaultValue={phone}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Area"
                          fontSize={{ base: "sm", md: "md" }}
                          minWidth={{ base: "auto", md: field_width }}
                        />
                        <Select
                          name="area"
                          value={value}
                          p={1}
                          size={{ base: "sm", md: "md" }}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                        >
                          <option value="">None</option>
                          {areas &&
                            areas.map((rec) => {
                              return (
                                <option value={rec.name}>{rec.name}</option>
                              );
                            })}
                        </Select>
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
            </VStack>
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
