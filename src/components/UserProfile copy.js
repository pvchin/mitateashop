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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useUsers } from "./react-query/users/useUsers";
import { useAreas } from "./react-query/area/useAreas";
import { useUpdateUser } from "./react-query/users/useUpdateUser";
import { useAuthUser } from "./react-query/auth/useAuthUser";

const initial_values = {
  name: "",
  email: "",
  phone: "",
};

export default function UserProfile() {
  const history = useHistory();
  const field_width = "40";
  const { authuser } = useAuthUser();
  const [state, setState] = useState(initial_values);
  const { users, setUserId } = useUsers();
  const { areas } = useAreas();
  const updateUser = useUpdateUser();
  const { name, email, phone, address1 } = state;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      state,
    },
  });

  useEffect(() => {
    setUserId(authuser[0].token);
  }, []);

  useEffect(() => {
    setState({ ...users[0] });
    reset({ ...users[0] });
  }, [reset]);

  if (!authuser.length === 0) {
    return <Redirect to="/signin" />;
  }

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //alert(JSON.stringify(values, null, 2));
        const { name, email, phone, address1, address2 } = values;
        const { id } = state;
        updateUser({
          id: id,
          name: name,
          phone: phone,
          address1: address1,
          address2: address2,
        });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box rounded="lg" bg="white" boxShadow="lg" p={3}>
            <FormControl isInvalid={errors.name}>
              <InputGroup>
                <HStack w="100%" py={1}>
                  <InputLeftAddon children="Name" minWidth={field_width} />
                  <Input
                    isRequired
                    id="name"
                    placeholder="name"
                    {...register("name", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                </HStack>
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <InputGroup>
                <HStack w="100%" py={1}>
                  <InputLeftAddon children="Email" minWidth={field_width} />
                  <Input
                    isReadOnly
                    id="email"
                    placeholder="email"
                    {...register("email", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                </HStack>
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.phone}>
              <InputGroup>
                <HStack w="100%" py={1}>
                  <InputLeftAddon children="Phone" minWidth={field_width} />
                  <Input
                    isRequired
                    id="phone"
                    placeholder="phone"
                    {...register("phone", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 8",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                  </FormErrorMessage>
                </HStack>
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={errors.address1}>
              <InputGroup>
                <HStack w="100%" py={1}>
                  <InputLeftAddon children="Address" minWidth={field_width} />
                  <Input
                    id="address1"
                    placeholder="address"
                    {...register("address1", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 8",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.address1 && errors.address1.message}
                  </FormErrorMessage>
                </HStack>
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={errors.address2}>
              <InputGroup>
                <HStack w="100%" py={1}>
                  <InputLeftAddon children="" minWidth={field_width} />
                  <Input
                    id="address2"
                    placeholder="address"
                    {...register("address2", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 8",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.address2 && errors.address2.message}
                  </FormErrorMessage>
                </HStack>
              </InputGroup>
            </FormControl>
            {/* <FormControl isInvalid={errors.area}>
              <InputGroup>
                <HStack w="100%">
                  <InputLeftAddon children="Area" minWidth={field_width} />
                  <Select
                    id="area"
                    placeholder="area"
                    {...register("area", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 8",
                      },
                    })}
                  >
                    {areas && areas.map((rec) => {
                      return (
                        <option key={rec.id} value={rec.name}>{rec.name }</option>
                      )
                    })}
                  </Select>
                  <FormErrorMessage>
                    {errors.area && errors.area.message}
                  </FormErrorMessage>
                </HStack>
              </InputGroup>
            </FormControl> */}
            <HStack justifyContent="center">
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                align="center"
              >
                Update
              </Button>
            </HStack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
