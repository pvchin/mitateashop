import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { images_url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  useRadio,
  useRadioGroup,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { currentorderState } from "../data/atomdata";
import { useAreas } from "../react-query/area/useAreas";
import { useDeliveryPeriod } from "../react-query/deliveryperiod/useDeliveryPeriod";
import { useOrders } from "../react-query/orders/useOrders";

const initial_order = [
  {
    orderno: "",
    email: "",
    custname: "",
    phone: "",
    address1: "",
    address2: "",
    grossamount: 0,
    deliveryfee: 0,
    nettamount: 0,
    deliverymode: "",
    paymentmode: "",
    requestdate: null,
    requesttime: "",
    area: "",
    remark: "",
    status: "",
  },
];

const OrderEdit = ({ order, updateOrders, onClose }) => {
  const history = useHistory();
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const field_width = "90";
  const { orders, setOrderId, setOrderNo } = useOrders();
  const { areas } = useAreas();
  const { deliveryperiod } = useDeliveryPeriod();
  const [currentorder, setCurrentOrder] = useRecoilState(currentorderState);
  const [isLoad, setIsLoad] = useState(true);
  const todaydate = dayjs().format("YYYY-MM-DD");
  console.log("current order", currentorder);
  const {
    orderno,
    email,
    custname,
    phone,
    address1,
    address2,
    grossamount,
    deliveryfee,
    nettamount,
    deliverymode,
    paymentmode,
    requestdate,
    requesttime,
    area,
    remark,
    status,
  } = order[0] || initial_order;

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting, id },
  } = useForm({
    defaultValues: {
      ...order[0],
    },
  });

  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {
    setOrderId(order.email);
    setOrderNo(order.orderno);
  }, [order]);

  useEffect(() => {
    reset({ ...order[0] });
  }, [order, reset]);

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        console.log("orders", orders);
        console.log("order values", values);
        //const id = orders && orders[0].id;
        const {
          id,
          name,
          phone,
          address1,
          address2,
          area,
          deliverymode,
          paymentmode,
          requestdate,
          requesttime,
          grossamount,
          nettamount,
          deliveryfee,
          remark,
        } = values;

        updateOrders({
          id: id,
          name: name,
          custname: name,
          phone: phone,
          address1: address1,
          address2: address2,
          deliverymode: deliverymode,
          paymentmode: paymentmode,
          area: area,
          requestdate: requestdate,
          requesttime: requesttime,
          grossamount: grossamount,
          nettamount: currentorder.nettamount,
          deliveryfee: currentorder.deliveryfee,
          remark: remark,
          status: "Confirmed",
        });
        onClose();
        resolve();
      }, 3000);
    });
  }

  const handleOnSelect = (e) => {
    e.preventDefault();
    console.log("onselect", e.target.value);
  };

  const handleOrderChange = (e) => {
    e.preventDefault();
    const areaname = e.target.value;
    const arearec = areas
      .filter((r) => r.name === areaname)
      .map((rec) => {
        return { ...rec };
      });
    const totamt = currentorder.grossamount + arearec[0].deliveryfee;
    setCurrentOrder({
      ...currentorder,
      deliveryfee: parseFloat(arearec[0].deliveryfee),
      nettamount: totamt,
    });
  };

  return (
    <Container maxWidth="container.xl" padding={0}>
      <Flex
        h={{ base: "auto", md: "180vh" }}
        py={[0, 0, 0]}
        direction={{ base: "column-reverse", md: "row" }}
        overflowY="scroll"
      >
        <VStack
          w={{ base: "auto", md: "full" }}
          h={{ base: "auto", md: "180vh" }}
          p="2"
          spacing="10"
          alignItems="flex-start"
        >
          <VStack spacing="3" alignItems="flex-start">
            <Heading size="xl">Your order details</Heading>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid
              columns={2}
              columnGap={3}
              rowGap={6}
              w={{ base: "auto", md: "full" }}
            >
              <GridItem colSpan={2}>
                <Button size="lg" w="full" type="submit">
                  Confirm Order
                </Button>
              </GridItem>
              <GridItem colSpan={2}>
                <Text
                  bg="gray.50"
                  h={38}
                  minWidth={field_width}
                  align="center"
                  p={2}
                  fontWeight="bold"
                  borderRadius="10"
                >
                  Your Order
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <HStack justifyContent="space-between" px={5}>
                  <Text fontWeight="bold">Subtotal</Text>
                  <Heading size="sm">
                    {" "}
                    {formatPrice(currentorder.grossamount)}
                  </Heading>
                </HStack>
              </GridItem>
              <GridItem colSpan={2}>
                <HStack justifyContent="space-between" px={5}>
                  <Text fontWeight="bold">Delivery</Text>
                  <Heading size="sm">
                    {formatPrice(currentorder.deliveryfee)}
                  </Heading>
                </HStack>
              </GridItem>
              <GridItem colSpan={2}>
                <HStack justifyContent="space-between" px={5}>
                  <Text fontWeight="bold" fontSize="md">
                    Total
                  </Text>
                  <Heading size="md">
                    {" "}
                    {formatPrice(currentorder.nettamount)}
                  </Heading>
                </HStack>
              </GridItem>
              <GridItem colSpan={2}>
                <Text
                  bg="gray.50"
                  h={38}
                  minWidth={field_width}
                  align="center"
                  p={2}
                  fontWeight="bold"
                  borderRadius="10"
                >
                  Your Details
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Name" minWidth={field_width} />
                    <Input
                      id="custname"
                      ml={2}
                      borderColor="gray.400"
                      placeholder="Name"
                      {...register("custname", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Address" minWidth={field_width} />
                    <Input
                      id="address1"
                      ml={2}
                      borderColor="gray.400"
                      placeholder="Address"
                      {...register("address1", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="" minWidth={field_width} />
                    <Input
                      id="address2"
                      ml={2}
                      borderColor="gray.400"
                      placeholder="Address"
                      {...register("address2", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Phone" minWidth={field_width} />
                    <Input
                      id="phone"
                      name="phone"
                      ml={2}
                      borderColor="gray.400"
                      placeholder="Phone"
                      {...register("phone", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Area" minWidth={field_width} />
                    <Select
                      id="area"
                      name="area"
                      ml={2}
                      borderColor="gray.400"
                      {...register("area", {
                        onChange: (e) => {
                          //handleChange(e);
                          handleOrderChange(e);
                        },
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                      // onChange={(e) => {
                      //   //e.onChange(e)
                      //   handleOrderChange(e);
                      // }}
                    >
                      {areas &&
                        areas.map((rec) => {
                          return (
                            <option key={rec.id} value={rec.name}>
                              {rec.name}
                            </option>
                          );
                        })}
                    </Select>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <Divider
                  mt={1}
                  mb={1}
                  colorScheme="red"
                  borderColor="blue.300"
                  border="1px"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Text
                  bg="gray.50"
                  h={38}
                  minWidth={field_width}
                  align="center"
                  p={2}
                  fontWeight="bold"
                  borderRadius="10"
                >
                  Your Requests
                </Text>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Date" minWidth={field_width} />
                    <Input
                      isRequired
                      id="requestdate"
                      ml={2}
                      borderColor="gray.400"
                      placeholder="Date"
                      type="date"
                      defaultValue={dayjs().format("DD-MM-YYYY")}
                      {...register("requestdate", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Time" minWidth={field_width} />
                    <Select
                      id="requesttime"
                      ml={2}
                      borderColor="gray.400"
                      {...register("requesttime", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    >
                      {deliveryperiod &&
                        deliveryperiod.map((rec) => {
                          return (
                            <option key={rec.id} value={rec.period}>
                              {rec.period}
                            </option>
                          );
                        })}
                    </Select>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Mode" minWidth={field_width} />
                    <Select
                      id="deliverymode"
                      ml={2}
                      borderColor="gray.400"
                      {...register("deliverymode", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    >
                      <option value="pickup">Self Pickup</option>
                      <option value="delivery">Delivery</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Payment" minWidth={field_width} />
                    <Select
                      id="paymentmode"
                      ml={2}
                      borderColor="gray.400"
                      {...register("paymentmode", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    >
                      <option value="collection">Upon collection</option>
                      <option value="bank">Bank Transfer</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Remark" minWidth={field_width} />
                    <Input
                      id="remark"
                      ml={2}
                      borderColor="gray.400"
                      placeholder="Remark"
                      {...register("remark", {
                        minLength: {
                          value: 0,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <Box
                  borderColor="red"
                  rounded="lg"
                  mt={5}
                  height
                  h={{
                    base: "auto",
                    sm: "auto",
                    md: "150",
                  }}
                >
                  <Tabs>
                    <TabList>
                      <Tab>Upon Collection</Tab>
                      <Tab>Bank Transfer</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <Box
                          p={5}
                          h="200"
                          borderRadius="25"
                          backgroundColor="gray.100"
                        >
                          <Text fontFamily="cursive" fontSize="15">
                            Please call upon arrival
                          </Text>
                          <Text
                            fontSize="25"
                            fontWeight="extrabold"
                            color="blue.500"
                            fontFamily="cursive"
                          >
                            7112268
                          </Text>
                          <Text fontFamily="cursive" fontSize="18">
                            and we will bring over to your car!
                          </Text>
                          <Text fontFamily="cursive" fontSize="18">
                            If you require any money changes, please let us know
                            in advance.
                          </Text>
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Box
                          h={{
                            base: "auto",
                            sm: "auto",
                            md: "150",
                          }}
                        >
                          <SimpleGrid
                            columns={{
                              base: "1",
                              sm: "1",
                              md: "2",
                            }}
                            gap={0}
                            bg="gray.100"
                            borderRadius="25"
                          >
                            <GridItem
                              colSpan={1}
                              align="left"
                              backgroundColor="gray.100"
                              borderRadius="25"
                            >
                              <Box>
                                <Heading
                                  fontFamily="cursive"
                                  fontSize="18"
                                  py={2}
                                  pl={2}
                                >
                                  Our Bank Details:
                                </Heading>
                                <Grid
                                  templateColumns="repeat(5,1fr)"
                                  gap={1}
                                  pl={2}
                                >
                                  <GridItem colSpan={1}>
                                    <Text
                                      //fontFamily="cursive"
                                      fontSize="18"
                                      fontWeight="bold"
                                    >
                                      Bank:
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={4}>
                                    <Text
                                      fontFamily="cursive"
                                      fontSize="18"
                                      color="blue.500"
                                    >
                                      BIBD
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={1}>
                                    <Text
                                      //fontFamily="cursive"
                                      fontSize="18"
                                      fontWeight="bold"
                                    >
                                      Name:
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={4}>
                                    <Text
                                      fontFamily="cursive"
                                      fontSize="18"
                                      color="blue.500"
                                    >
                                      YMS Enterprise
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={1}>
                                    <Text
                                      //fontFamily="cursive"
                                      fontSize="18"
                                      fontWeight="bold"
                                    >
                                      A/C:
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={4}>
                                    <Text
                                      fontFamily="cursive"
                                      fontSize="18"
                                      color="blue.500"
                                    >
                                      00-000-00-000000
                                    </Text>
                                  </GridItem>
                                </Grid>
                              </Box>
                            </GridItem>
                            <GridItem
                              py={1}
                              colSpan={1}
                              backgroundColor="gray.100"
                              borderRadius="15"
                            >
                              <Box>
                                <Container>
                                  <Text fontFamily="cursive" fontSize="18">
                                    Pls whatsapp your bank receipt to:
                                  </Text>
                                  <Text
                                    fontFamily="cursive"
                                    fontSize="20"
                                    fontWeight="extrabold"
                                    color="blue.500"
                                  >
                                    7112268
                                  </Text>

                                  <Text fontFamily="cursive" fontSize="18">
                                    Pls state your order # on your whatsapp
                                  </Text>
                                  <Text
                                    color="red"
                                    fontFamily="cursive"
                                    fontSize="20"
                                    fontWeight="extrabold"
                                  >
                                    Thank you!
                                  </Text>
                                </Container>
                              </Box>
                            </GridItem>
                          </SimpleGrid>
                        </Box>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </GridItem>
            </SimpleGrid>
          </form>
        </VStack>
      </Flex>
    </Container>
  );
};

export default OrderEdit;
