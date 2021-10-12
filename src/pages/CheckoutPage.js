import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { RiTakeawayFill } from "react-icons/ri";
import { GiCardPickup } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { GoListOrdered } from "react-icons/go";
import { useUserContext } from "../context/user_context";
import { Controller, useForm } from "react-hook-form";
//FaRegMoneyBillAlt
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
import { useCustomToast } from "../components/helpers/useCustomToast";
import { AlertDialogBox } from "../components/helpers/AlertDialogBox";
import { orderState } from "../components/data/atomdata";
import { formatPrice } from "../utils/helpers";
import { PageHero } from "../components";
import OrderDetails from "../components/OrderDetails";
import OrderInfo from "../components/OrderInfo";
import { useAuthUser } from "../components/react-query/auth/useAuthUser";
import { useUsers } from "../components/react-query/users/useUsers";
//import { useSingleOrder } from "../components/react-query/orders/useSingleOrder";
import { useOrderItems } from "../components/react-query/orderitems/useOrderItems";
import { useOrderAddon } from "../components/react-query/orderaddon/useOrderAddon";
import { useUpdateOrders } from "../components/react-query/orders/useUpdateOrders";
import { useAreas } from "../components/react-query/area/useAreas";

const CheckoutPage = () => {
  const toast = useCustomToast();
  const history = useHistory();
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const field_width = "90";
  const { authuser } = useAuthUser();
  const { users, setUserId } = useUsers();
  const { areas } = useAreas();
  //const { singleorder, setSingleOrderId } = useSingleOrder();
  const updateOrders = useUpdateOrders();
  const { orderitems, setOrderItemId } = useOrderItems();
  const { orderaddon, setOrderAddonId } = useOrderAddon();
  const [order, setOrder] = useRecoilState(orderState);
  const [deliveryfee, setDeliveryFee] = useState(0);
  const [deliverymode, setDeliveryMode] = useState("delivery");
  const [totalorderamt, setTotalOrderAmt] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState({});
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState(false);
  const [isAlertSaveOpen, setIsAlertSaveOpen] = useState(false);

  useEffect(() => {
    //setSingleOrderId(order.orderno);
    setOrderItemId(order.orderno);
    setOrderAddonId(order.orderno);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.orderno]);

  // useEffect(() => {
  //   const total = order.nettamt + deliveryfee;
  //   setTotalOrderAmt(total);
  // }, [order, deliveryfee]);

  useEffect(() => {
    setUserId(authuser[0].token);
  }, []);

  const handleAlertDeleteOpen = () => {
    setIsAlertDeleteOpen(true);
  };

  const handleAlertDeleteClose = () => {
    setIsAlertDeleteOpen(false);
  };

  // const handleOnDeleteConfirm = () => {
  //   updateOrders({ id: singleorder[0].id, status: "Deleted" });
  //   toast({
  //     title: "Order being deleted!",
  //     status: "warning",
  //   });
  //   history.push("/userorders");
  // };

  const handleAlertSaveOpen = () => {
    setIsAlertSaveOpen(true);
  };

  const handleAlertSaveClose = () => {
    setIsAlertSaveOpen(false);
  };

  // const handleOnSaveConfirm = () => {
  //   updateOrders({ id: singleorder[0].id, status: "Confirmed" });
  //   toast({
  //     title: "Order being submitted!",
  //     status: "success",
  //   });
  //   history.push("/userorders");
  // };

  return (
    <main>
      <PageHero title="checkout" />
      <Container maxWidth="container.xl" padding={0}>
        <Flex
          h={{ base: "auto", md: "180vh" }}
          py={[0, 10, 20]}
          direction={{ base: "column-reverse", md: "row" }}
        >
          <Box
            overflowY={{ base: "scoll", md: "none" }}
            //h={{ base: "auto", md: "180vh" }}
          >
            <OrderInfo
              order={order}
              updateOrders={updateOrders}
              setDeliveryFee={setDeliveryFee}
            />
          </Box>
          {/* <VStack w="full" h="full" p="5" spacing="10" alignItems="flex-start">
            <VStack spacing="3" alignItems="flex-start">
              <Heading size="xl">Your details</Heading>
            </VStack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={2}>
                  <Button size="lg" w="full" type="submit">
                    Confirm Order
                  </Button>
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
                      <InputLeftAddon
                        children="Address"
                        minWidth={field_width}
                      />
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
                        ml={2}
                        borderColor="gray.400"
                        {...register("area", {
                          minLength: {
                            value: 4,
                            message: "Minimum length should be 4",
                          },
                        })}
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
                        //defaultValue={dayjs().format("DD-MM-YYYY")}
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
                        <option value="option1">10am to 11am </option>
                        <option value="option2">11am to 12am</option>
                        <option value="option3">12pm to 1pm</option>
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
                      <InputLeftAddon
                        children="Payment"
                        minWidth={field_width}
                      />
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
                      <InputLeftAddon
                        children="Remark"
                        minWidth={field_width}
                      />
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
                  <Box borderColor="red" rounded="lg" mt={5} height="230px">
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
                              If you require any money changes, please let us
                              know in advance.
                            </Text>
                          </Box>
                        </TabPanel>
                        <TabPanel>
                          <Box
                            h={{
                              base: "350",
                              sm: "350",
                              md: "150",
                            }}
                          >
                            <SimpleGrid
                              columns={{
                                base: "1",
                                sm: "1",
                                md: "2",
                              }}
                              gap={2}
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
                                    pl={5}
                                  >
                                    Our Bank Details:
                                  </Heading>
                                  <Grid
                                    templateColumns="repeat(5,1fr)"
                                    gap={1}
                                    pl={5}
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
                                py={2}
                                colSpan={1}
                                backgroundColor="gray.100"
                                borderRadius="25"
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
          </VStack> */}
          {/* Order Details */}
          <VStack
            w={{ base: "auto", md: "60%" }}
            h={{ base: "auto", md: "160vh" }}
            p="10"
            spacing="10"
            alignItems="flex-start"
            bg={bgColor}
          >
            <VStack alignItems="flex-start" spacing={3}>
              <Heading size="2x1">Your cart</Heading>
              <Heading fontFamily="cursive" color="green" size="md">
                order no {order.orderno}
              </Heading>
            </VStack>
            <HStack spacing="6" alignItems="center" w="full">
              <Stack
                spacing="0"
                w="full"
                h={{ base: "130vh", md: "130vh" }}
                direction="row"
                justifyContent="space-between"
                //alignItems="center"
                overflowY="scroll"
              >
                <OrderDetails
                  orderdetails={orderitems}
                  orderaddon={orderaddon}
                />
              </Stack>
            </HStack>
            {/* <VStack spacing="4" pr={5} alignItems="stretch" w="full">
              <HStack justifyContent="space-between">
                <Text color="gray.600">Subtotal</Text>
                <Heading size="sm"> {formatPrice(order.nettamt)}</Heading>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Delivery</Text>
                <Heading size="sm">{formatPrice(deliveryfee)}</Heading>
              </HStack>
              <Divider />
              <HStack justifyContent="space-between">
                <Text color="gray.600">Total</Text>
                <Heading size="lg"> {formatPrice(totalorderamt)}</Heading>
              </HStack>
            </VStack> */}
          </VStack>
        </Flex>
      </Container>
      <Box>
        <AlertDialogBox
          onClose={handleAlertDeleteClose}
          //onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertDeleteOpen}
          title="Delete Order"
        >
          <h2>Are you sure you want to delete this order?</h2>
        </AlertDialogBox>
        <AlertDialogBox
          onClose={handleAlertSaveClose}
          //onConfirm={handleOnSaveConfirm}
          isOpen={isAlertSaveOpen}
          title="Save Order"
        >
          <h2>Are you sure you want to confirm this order ?</h2>
        </AlertDialogBox>

        {/* <Box>
            <Box
              w={{
                base: "100%",
                sm: "100%",
                md: "76%",
              }}
              ml={{
                base: "0%",
                sm: "0%",
                md: "12%",
              }}
              align="center"
              borderWidth="1px"
              borderRadius="25"
              //border="1px solid red"
              backgroundColor="gray.100"
              p={5}
            >
              
              <Box p={1} direction="row">
                <Tabs isFitted px={5} variant="enclosed" align="center">
                  <HStack>
                    <TabList width="100%">
                      <Tab
                        borderBottomColor="teal.500"
                        _selected={{ color: "white", bg: "blue.500" }}
                      >
                        <Box px={3}>
                          <FaRegMoneyBillAlt size="40" color="blue" />
                        </Box>
                        <Box>
                          <Heading fontFamily="cursive" size="md">
                            Payment upon collection
                          </Heading>
                        </Box>
                      </Tab>
                    </TabList>
                    <TabList width="100%">
                      <Tab
                        borderBottomColor="teal.500"
                        _selected={{ color: "white", bg: "green.500" }}
                      >
                        <Box px={3}>
                          <AiFillBank size="40" color="blue" />
                        </Box>
                        <Box>
                          <Heading fontFamily="cursive" size="md">
                            Payment by bank transfer
                          </Heading>
                        </Box>
                      </Tab>
                    </TabList>
                  </HStack>
                  <TabPanels borderRadius="lg">
                    <TabPanel>
                      <Box
                        p={5}
                        h="250"
                        borderRadius="25"
                        backgroundColor="blue.100"
                      >
                        <Text fontFamily="cursive" fontSize="25">
                          Please call upon arrival
                        </Text>
                        <Text
                          fontSize="35"
                          fontWeight="extrabold"
                          color="blue"
                          fontFamily="cursive"
                        >
                          7112268
                        </Text>
                        <Text fontFamily="cursive" fontSize="25">
                          and we will bring over to your car!
                        </Text>
                        <Text fontFamily="cursive" fontSize="25">
                          If you require any money changes, please let us know
                          in advance.
                        </Text>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box
                        h={{
                          base: "350",
                          sm: "350",
                          md: "150",
                        }}
                      >
                        <SimpleGrid
                          columns={{
                            base: "1",
                            sm: "1",
                            md: "2",
                          }}
                          gap={2}
                        >
                          <GridItem
                            colSpan={1}
                            align="left"
                            backgroundColor="teal.100"
                            borderRadius="25"
                          >
                            <Box>
                              <Heading
                                fontFamily="cursive"
                                fontSize="25"
                                py={2}
                                pl={5}
                              >
                                Our Bank Details:
                              </Heading>
                              <Grid
                                templateColumns="repeat(5,1fr)"
                                gap={1}
                                pl={5}
                              >
                                <GridItem colSpan={1}>
                                  <Text
                                    fontFamily="cursive"
                                    fontSize="20"
                                    fontWeight="bold"
                                  >
                                    Bank:
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={4}>
                                  <Text
                                    fontFamily="cursive"
                                    fontSize="20"
                                    color="blue.500"
                                  >
                                    BIBD
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Text
                                    fontFamily="cursive"
                                    fontSize="20"
                                    fontWeight="bold"
                                  >
                                    A/C Name:
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={4}>
                                  <Text
                                    fontFamily="cursive"
                                    fontSize="20"
                                    color="blue.500"
                                  >
                                    YMS Enterprise
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Text
                                    fontFamily="cursive"
                                    fontSize="20"
                                    fontWeight="bold"
                                  >
                                    A/C No:
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={4}>
                                  <Text
                                    fontFamily="cursive"
                                    fontSize="20"
                                    color="blue.500"
                                  >
                                    00-000-00-000000
                                  </Text>
                                </GridItem>
                              </Grid>
                            </Box>
                          </GridItem>
                          <GridItem
                            py={2}
                            colSpan={1}
                            backgroundColor="blue.100"
                            borderRadius="25"
                          >
                            <Box>
                              <Container>
                                <Text fontFamily="cursive" fontSize="25">
                                  Pls whatsapp your bank receipt to
                                </Text>
                                <Text
                                  fontFamily="cursive"
                                  fontSize="30"
                                  fontWeight="extrabold"
                                  color="blue"
                                >
                                  7112268
                                </Text>

                                <Text fontFamily="cursive" fontSize="25">
                                  Pls state your order # on your whatsapp
                                </Text>
                                <Text
                                  color="red"
                                  fontFamily="cursive"
                                  fontSize="25"
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
            </Box>
          </Box> */}
      </Box>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
