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
import { useCustomToast } from "./helpers/useCustomToast";
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

export default function OrderDelivery({ currentorder, setCurrentOrder, updateOrder, onClose }) {
  const history = useHistory();
  const toast = useCustomToast()
  const field_width = "105px";
  const { authuser } = useAuthUser();
  const [state, setState] = useState(initial_values);
  const { users, setUserId } = useUsers();
  const { areas } = useAreas();
  const updateUser = useUpdateUser();
  const { name, email, phone, address1 } = state;
  console.log("currentorder", currentorder);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...currentorder,
    },
  });

  useEffect(() => {
    setUserId(authuser[0].token);
  }, []);

  useEffect(() => {
    reset({ ...currentorder });
  }, [currentorder, reset]);

  if (!authuser.length === 0) {
    return <Redirect to="/signin" />;
  }

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //alert(JSON.stringify(values, null, 2));
        const { orderid, deliverydate, deliverytime, comment } = values;
        
        updateOrder({
          id: orderid,
          comments: `On ${deliverydate} at ${deliverytime} ${comment}`,
          status: "Delivered"
        });
         toast({
           title: "Order being updated!",
           status: "success",
         });
        resolve();
      }, 3000);
      onClose()
    });
  }

  return (
    <Stack spacing={8} mx="auto" w="xl" py={12} px={2}>
      <Stack align="center">
        <Heading size="md">Delivery Details</Heading>
        <Heading size="md">Order # {currentorder.orderno}</Heading>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box rounded="lg" bg="white" boxShadow="lg" p={3}>
          <FormControl isInvalid={errors.deliverydate}>
            <InputGroup>
              <HStack w="100%" py={1}>
                <InputLeftAddon children="Date" minWidth={field_width} />
                <Input
                  isRequired
                  id="deliverydate"
                  name="deliverydate"
                  placeholder="delivery date"
                  type="date"
                  {...register("deliverydate", {
                    minLength: {
                      value: 0,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
              </HStack>
            </InputGroup>
            <FormErrorMessage>
              {errors.deliverydate && errors.deliverydate.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.deliverytime}>
            <InputGroup>
              <HStack w="100%" py={1}>
                <InputLeftAddon children="Time" minWidth={field_width} />
                <Input
                  id="deliverytime"
                  placeholder="delivery time"
                  {...register("deliverytime", {
                    minLength: {
                      value: 0,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
              </HStack>
            </InputGroup>
            <FormErrorMessage>
              {errors.deliverytime && errors.deliverytime.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.comments}>
            <InputGroup>
              <HStack w="100%" py={1}>
                <InputLeftAddon children="Comment" minWidth={field_width} />
                <Input
                  isRequired
                  id="comment"
                  placeholder="comment"
                  {...register("comment", {
                    minLength: {
                      value: 0,
                      message: "Minimum length should be 8",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.comment && errors.comment.message}
                </FormErrorMessage>
              </HStack>
            </InputGroup>
          </FormControl>

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
  );
}
