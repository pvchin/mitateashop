import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
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
import { createLocalStorageStateHook } from "use-local-storage-state";
import { carts_localstorage_key } from "../utils/constants";
import { currentorderState } from "../data/atomdata";
import { useCustomToast } from "../helpers/useCustomToast";
import { useAreas } from "../react-query/area/useAreas";
import { useDeliveryPeriod } from "../react-query/deliveryperiod/useDeliveryPeriod";
import { useOrders } from "../react-query/orders/useOrders";
import { useAddOrders } from "../react-query/orders/useCreateOrders";
import { useOrderItems } from "../react-query/orderitems/useOrderItems";
import { useAddOrderItems } from "../react-query/orderitems/useCreateOrderItems";
import { useOrderAddon } from "../react-query/orderaddon/useOrderAddon";
import { useAddOrderAddon } from "../react-query/orderaddon/useCreateOrderAddon";
import { useDocument } from "../react-query/document/useDocument";
import { useUpdateDocument } from "../react-query/document/useUpdateDocument";
import { useCarts } from "../react-query/carts/useCarts";
import OrderConfirm from "./OrderConfirm";
import OrderReceipt from "./OrderReceipt";

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

const OrderInfo = ({ order, updateOrders, setDeliveryFee }) => {
  const history = useHistory();
  const toast = useCustomToast();
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const field_width = "90";
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const { carts, clearCarts } = useCarts();
  const { orders, setOrderId, setOrderNo } = useOrders();
  const addOrders = useAddOrders();
  const addOrderItems = useAddOrderItems();
  const addOrderAddon = useAddOrderAddon();
  const updateDocument = useUpdateDocument();
  const { document } = useDocument();
  const { areas } = useAreas();
  const { deliveryperiod } = useDeliveryPeriod();
  const [currentorder, setCurrentOrder] = useRecoilState(currentorderState);
  const [paytabindex, setPayTabIndex] = useState(1);
  const [neworderno, setNewOrderNo] = useState("");
  const [isLoad, setIsLoad] = useState(true);
  const todaydate = dayjs().format("YYYY-MM-DD");
  const exportPdfTable = ({ data }) => {
    OrderReceipt({ data });
  };
  const {
    isOpen: isConfirmOrderOpen,
    onOpen: onConfirmOrderOpen,
    onClose: onConfirmOrderClose,
  } = useDisclosure();
  console.log("checkout", currentorder);
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
    control,
    reset,
    formState: { errors, isSubmitting, id },
  } = useForm({
    defaultValues: {
      order,
    },
  });

  useEffect(() => {
    if (
      orders.length > 0 &&
      orders[0].orderno === currentorder.currentorderno
    ) {
      setCurrentOrder({ ...currentorder, currentorderid: orders[0].id });
      setIsLoad(false);
    }
  }, [isLoad]);

  useEffect(() => {
    setOrderId(order.email);
    setOrderNo(order.orderno);
  }, [order]);

  useEffect(() => {
    reset({ ...order });
  }, [order]);

  function onSubmit(values, statustype) {
    //return new Promise((resolve) => {
    //setTimeout(() => {
    if (statustype === "Confirmed") {
      // generate new order no
      const newOrderNo = parseFloat(document[0].orderno) + 1;
      setNewOrderNo((Prev) => (Prev = newOrderNo));
      updateDocument({
        id: document[0].id,
        orderno: newOrderNo.toString(),
      });
      const {
        email,
        custname,
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

      // save order header
      addOrders({
        orderno: newOrderNo.toString(),
        email: email,
        custname: custname,
        phone: phone,
        address1: address1,
        address2: address2,
        grossamount: grossamount,
        deliveryfee: deliveryfee,
        nettamount: nettamount,
        deliverymode: deliverymode,
        paymentmode: paymentmode,
        area: area,
        requestdate: requestdate,
        requesttime: requesttime,
        remark: remark,
        status: statustype,
      });

      mcarts &&
        mcarts.forEach((rec) => {
          const { addon } = rec;
          const toppings = addon;

          addOrderItems({
            orderno: newOrderNo.toString(),
            orderitemid: rec.id,
            itemid: rec.itemid,
            name: rec.name,
            price: rec.price,
            nettprice: rec.nettprice,
            qty: rec.qty,
            image: rec.image,
            totalprice: rec.totalprice,
            sugarlevel: rec.sugarlevel,
            icelevel: rec.icelevel,
            mprice: rec.mprice,
            lprice: rec.lprice,
            size: rec.size,
          });

          toppings
            .filter((r) => r.checked === true)
            .forEach((item) => {
              addOrderAddon({
                orderno: newOrderNo.toString(),
                orderitemid: rec.id,
                name: item.name,
                description: item.description,
                price: item.price,
                checked: item.checked,
              });
            });
        });
      clearCarts();
      // toast({
      //   title: "Your Order being saved!",
      //   status: "success",
      // });
      //resolve();
      onConfirmOrderOpen();
      history.push("/userorders");
    }
    if (statustype === "Pending") {
      history.push("/products");
    }
    //}, 3000);
    //});
  }

  const onPrintSubmit = (values) => {
    exportPdfTable({ orderstate: values });
  };

  const handleAreaChange = (e) => {
    e.preventDefault();
    if (currentorder.deliverymode === "pickup") {
      setCurrentOrder({
        ...currentorder,
        area: e.target.value,
        deliveryfee: 0,
        nettamount: currentorder.grossamount,
      });
    } else {
      const areaname = e.target.value;
      const arearec = areas
        .filter((r) => r.name === areaname)
        .map((rec) => {
          return { ...rec };
        });
      const totamt = currentorder.grossamount + arearec[0].deliveryfee;
      setCurrentOrder({
        ...currentorder,
        area: e.target.value,
        deliveryfee: parseFloat(arearec[0].deliveryfee),
        nettamount: totamt,
      });
    }
  };

  const handleDeliveryMode = (e) => {
    e.preventDefault();
    if (e.target.value === "pickup") {
      setCurrentOrder({
        ...currentorder,
        deliveryfee: 0,
        deliverymode: e.target.value,
        nettamount: currentorder.grossamount,
      });
    }

    if (e.target.value === "delivery") {
      const areaname = currentorder.area;
      const arearec = areas
        .filter((r) => r.name === areaname)
        .map((rec) => {
          return { ...rec };
        });
      const totamt =
        currentorder.grossamount + arearec.length > 0
          ? arearec[0].deliveryfee
          : 0;
      setCurrentOrder({
        ...currentorder,
        deliverymode: e.target.value,
        deliveryfee: parseFloat(arearec[0].deliveryfee),
        nettamount: totamt,
      });
    }
  };

  const handlePayTabs = (e) => {
    //console.log("tabs", e);
    if (e.target.value === "bank") {
      setPayTabIndex(1);
    } else {
      setPayTabIndex(0);
    }
    //console.log("tabs no", paytabindex);
  };

  const handlePayTabsChange = (index) => {
    setPayTabIndex(index);
  };

  return (
    <Container maxWidth="container.xl" padding={0}>
      <Flex
        h={{ base: "auto", md: "160vh" }}
        py={[0, 0, 0]}
        direction={{ base: "column-reverse", md: "row" }}
        overflowY="scroll"
      >
        <VStack
          w={{ base: "auto", md: "full" }}
          h={{ base: "auto", md: "170vh" }}
          p="2"
          spacing="10"
          alignItems="flex-start"
        >
          <VStack spacing="3" alignItems="flex-start">
            <Heading size="xl">Your order details</Heading>
          </VStack>
          <form>
            <SimpleGrid
              columns={2}
              columnGap={3}
              rowGap={6}
              w={{ base: "auto", md: "full" }}
            >
              <GridItem colSpan={2}>
                <HStack>
                  <Button
                    size="lg"
                    w="full"
                    type="button"
                    color="green"
                    onClick={handleSubmit((values) =>
                      onSubmit(values, "Confirmed")
                    )}
                  >
                    <Text
                      fontWeight="bold"
                      fontSize={{
                        base: "12px", // 0-48em
                        md: "14px", // 48em-80em,
                        xl: "18px", // 80em+
                      }}
                    >
                      Confirm Order
                    </Text>
                  </Button>
                  <Button
                    size="lg"
                    w="full"
                    type="button"
                    color="red"
                    onClick={handleSubmit((values) =>
                      onSubmit(values, "Pending")
                    )}
                  >
                    <Text
                      fontWeight="bold"
                      fontSize={{
                        base: "12px", // 0-48em
                        md: "14px", // 48em-80em,
                        xl: "18px", // 80em+
                      }}
                    >
                    Continue Shopping
                    </Text>
                  </Button>
                  {/* <Button
                    size="lg"
                    w="full"
                    type="button"
                    color="red"
                    onClick={handleSubmit((values) => onPrintSubmit(values))}
                  >
                    Print Order
                  </Button> */}
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
                  <Controller
                    control={control}
                    name="custname"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Name"
                            minWidth={field_width}
                          />
                          <Input
                            name="custname"
                            value={value}
                            onChange={onChange}
                            borderColor="gray.400"
                            textTransform="capitalize"
                            ref={ref}
                            placeholder="name"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="address1"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Address"
                            minWidth={field_width}
                          />
                          <Input
                            name="address1"
                            value={value}
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="address"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="address2"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon children="" minWidth={field_width} />
                          <Input
                            name="address2"
                            value={value}
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="address"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <Controller
                    control={control}
                    name="phone"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Phone"
                            minWidth={field_width}
                          />
                          <Input
                            name="phone"
                            value={value}
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="phone"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <Controller
                    control={control}
                    name="area"
                    defaultValue={currentorder.area}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Area"
                            minWidth={field_width}
                          />
                          <Select
                            name="area"
                            value={currentorder.area}
                            onChange={(e) => {
                              onChange(e);
                              handleAreaChange(e);
                            }}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            //placeholder="name"
                          >
                            <option value="">None</option>
                            {areas &&
                              areas.map((rec) => {
                                return (
                                  <option key={rec.id} value={rec.name}>
                                    {rec.name}
                                  </option>
                                );
                              })}
                          </Select>
                        </HStack>
                      </InputGroup>
                    )}
                  />
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
                  <Controller
                    control={control}
                    name="requestdate"
                    defaultValue={dayjs().format("YYYY-MM-DD")}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Date"
                            minWidth={field_width}
                          />
                          <Input
                            name="requestdate"
                            value={value}
                            type="date"
                            borderColor="gray.400"
                            fontSize="15"
                            //defaultValue={dayjs().format("DD-MM-YYYY")}
                            onChange={onChange}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="date"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <Controller
                    control={control}
                    name="requesttime"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Time"
                            minWidth={field_width}
                          />
                          <Select
                            name="requesttime"
                            value={value}
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            //placeholder="time"
                          >
                            <option value="">None</option>
                            {deliveryperiod &&
                              deliveryperiod.map((rec) => {
                                return (
                                  <option key={rec.id} value={rec.period}>
                                    {rec.period}
                                  </option>
                                );
                              })}
                          </Select>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <Controller
                    control={control}
                    name="deliverymode"
                    defaultValue={currentorder.deliverymode}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Mode"
                            minWidth={field_width}
                          />
                          <Select
                            name="deliverymode"
                            value={currentorder.delivermode}
                            // onChange={onChange}
                            onChange={(e) => {
                              onChange(e);
                              handleDeliveryMode(e);
                            }}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            //placeholder=""
                          >
                            <option value="pickup">Self Pickup</option>
                            <option value="delivery">Delivery</option>
                          </Select>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <Controller
                    control={control}
                    name="paymentmode"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Payment"
                            minWidth={field_width}
                          />
                          <Select
                            name="paymentmode"
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              handlePayTabs(e);
                            }}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            //placeholder=""
                          >
                            <option value="collection">Upon collection</option>
                            <option value="bank">Bank Transfer</option>
                          </Select>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="remark"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Remark"
                            minWidth={field_width}
                          />
                          <Input
                            name="remark"
                            value={value}
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="remark"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
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
                  <Tabs index={paytabindex} onChange={handlePayTabsChange}>
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
                                      fontSize="16"
                                      fontWeight="bold"
                                    >
                                      Bank:
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={4}>
                                    <Text
                                      fontFamily="cursive"
                                      fontSize="16"
                                      color="blue.500"
                                    >
                                      BIBD
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={1}>
                                    <Text
                                      //fontFamily="cursive"
                                      fontSize="16"
                                      fontWeight="bold"
                                    >
                                      Name:
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={4}>
                                    <Text
                                      fontFamily="cursive"
                                      fontSize="16"
                                      color="blue.500"
                                    >
                                      YMS Enterprise
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={1}>
                                    <Text
                                      //fontFamily="cursive"
                                      fontSize="16"
                                      fontWeight="bold"
                                    >
                                      A/C:
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={4}>
                                    <Text
                                      fontFamily="cursive"
                                      fontSize="16"
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
                                  <Text fontFamily="cursive" fontSize="16">
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

                                  <Text fontFamily="cursive" fontSize="16">
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
          <Modal
            //w="500px"
            //h="200px"
            isOpen={isConfirmOrderOpen}
            onClose={onConfirmOrderClose}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent>
              {/* <ModalHeader>Order Delivery #{currentorder.orderno}</ModalHeader> */}
              <ModalCloseButton />
              <ModalBody>
                <HStack>
                  <OrderConfirm neworderno={neworderno} />
                </HStack>
              </ModalBody>
              {/* <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onConfirmOrderClose}>
                  Close
                </Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
        </VStack>
      </Flex>
    </Container>
  );
};

export default OrderInfo;
