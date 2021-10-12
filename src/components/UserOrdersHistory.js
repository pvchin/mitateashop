import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import MaterialTable, { MTableToolbar } from "material-table";
import { GrFormView } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useRecoilState } from "recoil";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import FilterList from "@material-ui/icons/FilterList";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
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
  useControllableState,
} from "@chakra-ui/react";
import { useCustomToast } from "./helpers/useCustomToast";
import { AlertDialogBox } from "../components/helpers/AlertDialogBox";
import { currentorderState } from "../components/data/atomdata";
import { useOrders } from "./react-query/orders/useOrders";
import { useUpdateOrders } from "./react-query/orders/useUpdateOrders";
import { useSingleOrder } from "./react-query/orders/useSingleOrder";
import { useOrderItems } from "./react-query/orderitems/useOrderItems";
import { useOrderAddon } from "./react-query/orderaddon/useOrderAddon";
import { useAuthUser } from "./react-query/auth/useAuthUser";
import OrderDetails from "../components/OrderDetails";
import OrderInfoView from "../components/OrderInfoView";
import OrderEdit from "./OrderEdit";

const confirm_columns = [
  {
    title: "Order No",
    field: "orderno",
  },
  {
    title: "Name",
    field: "custname",
    editable: "never",
  },
  {
    title: "Area",
    field: "area",
    editable: "never",
  },
  {
    title: "Request Date",
    field: "requestdate",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Request Time",
    field: "requesttime",
    editable: "never",
  },
  {
    title: "Delivery Mode",
    field: "deliverymode",
    editable: "never",
  },
  {
    title: "Order Amount ",
    field: "grossamount",
    type: "currency",
    editable: "never",
  },
  {
    title: "Delivery Fee ",
    field: "deliveryfee",
    type: "currency",
    editable: "never",
  },
  {
    title: "Total Amount ",
    field: "nettamount",
    type: "currency",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    editable: "never",
  },
  {
    title: "Remark",
    field: "remark",
    editable: "never",
  },
];

const others_columns = [
  {
    title: "Order No",
    field: "orderno",
  },
  {
    title: "Name",
    field: "custname",
    editable: "never",
  },
  {
    title: "Area",
    field: "area",
    editable: "never",
  },
  {
    title: "Request Date",
    field: "requestdate",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Request Time",
    field: "requesttime",
    editable: "never",
  },
  {
    title: "Delivery Mode",
    field: "deliverymode",
    editable: "never",
  },
  {
    title: "Order Amount ",
    field: "grossamount",
    type: "currency",
    editable: "never",
  },
  {
    title: "Delivery Fee ",
    field: "deliveryfee",
    type: "currency",
    editable: "never",
  },
  {
    title: "Total Amount ",
    field: "nettamount",
    type: "currency",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    editable: "never",
  },
  {
    title: "Comment",
    field: "comments",
    editable: "never",
  },
];

const tableIcons = {
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
};

const UserOrdersHistory = ({ images = [{ url: "" }] }) => {
  const toast = useCustomToast();
  const { orders, setOrderId } = useOrders();
  const { singleorder, setSingleOrderId, setSingleOrderNo } = useSingleOrder();
  const { orderitems, setOrderItemId } = useOrderItems();
  const { orderaddon, setOrderAddonId } = useOrderAddon();
  const updateOrders = useUpdateOrders();
  const { authuser } = useAuthUser();
  const {
    isOpen: isViewOrderOpen,
    onOpen: onViewOrderOpen,
    onClose: onViewOrderClose,
  } = useDisclosure();
  const {
    isOpen: isEditOrderOpen,
    onOpen: onEditOrderOpen,
    onClose: onEditOrderClose,
  } = useDisclosure();
  const {
    isOpen: isAlertDeleteOpen,
    onOpen: onAlertDeleteOpen,
    onClose: onAlertDeleteClose,
  } = useDisclosure();
  const [currentorder, setCurrentOrder] = useRecoilState(currentorderState);
  const [orderno, setOrderNo] = useControllableState("");
  const [main, setMain] = useState(images[0]);

  const tableRef = React.createRef();

  useEffect(() => {
    setOrderId(authuser[0].email);
  }, []);

  const handleViewOrder = (rowData) => {
    const { email, orderno } = rowData;
    //setOrderNo(orderno);
    setSingleOrderId(email);
    setSingleOrderNo(orderno);
    setOrderItemId(orderno);
    setOrderAddonId(orderno);
    onViewOrderOpen();
  };

  const handleEditOrder = (rowData) => {
    console.log("rowdata", rowData);
    const {
      id,
      email,
      orderno,
      area,
      deliverymode,
      deliveryfee,
      grossamount,
      nettamount,
    } = rowData;
    setCurrentOrder({
      orderid: id,
      orderno: orderno,
      area: area ? area : "",
      deliverymode: deliverymode,
      grossamount: grossamount,
      nettamount: nettamount,
      deliveryfee: deliveryfee,
    });
    setSingleOrderId(email);
    setSingleOrderNo(orderno);
    setOrderItemId(orderno);
    setOrderAddonId(orderno);
    onEditOrderOpen();
  };

  const handleDeleteOrder = (rowData) => {
    const {
      id,
      email,
      area,
      orderno,
      deliverymode,
      deliveryfee,
      grossamount,
      nettamount,
    } = rowData;
    setCurrentOrder({
      orderid: id,
      orderno: orderno,
      area: area,
      deliverymode: deliverymode,
      grossamount: grossamount,
      nettamount: nettamount,
      deliveryfee: deliveryfee,
    });
    onAlertDeleteOpen();
  };

  const handleOnDeleteConfirm = () => {
    const { orderid } = currentorder;
    updateOrders({
      id: orderid,
      status: "Deleted",
      comments: `On ${dayjs().format("YYYY-MM-DD HH:mm:ss")} by user`,
    });
    toast({
      title: "Order being deleted!",
      status: "warning",
    });
    //history.push("/userorders");
  };

  return (
    <Wrapper>
      <Box>
        <Box align="center">
          <Heading>Orders History</Heading>
        </Box>
        <Box align="center">
          <Tabs align="center" isLazy>
            <TabList>
              <Tab>Pending</Tab>
              <Tab>Confirmed</Tab>
              <Tab>Deleted</Tab>
              <Tab>Delivered</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box w="80%">
                  <MaterialTable
                    columns={confirm_columns}
                    data={
                      orders &&
                      orders
                        .filter(
                          (r) =>
                            r.email === authuser[0].email &&
                            r.status === "Pending"
                        )
                        .map((rec) => {
                          return { ...rec };
                        })
                    }
                    title="Orders Tables"
                    icons={tableIcons}
                    actions={[
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <AiFillEdit size="30px" />,
                        tooltip: "Edit Record",
                        onClick: (event, rowData) => {
                          handleEditOrder(rowData);
                        },
                      }),
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <AiFillDelete />,
                        tooltip: "Delete Record",
                        onClick: (event, rowData) => {
                          handleDeleteOrder(rowData);
                        },
                      }),
                    ]}
                    options={{
                      filtering: false,
                      search: false,
                      toolbar: false,
                      headerStyle: {
                        backgroundColor: "#9AE6B4",
                        color: "black",
                        fontWeight: "bold",
                      },
                      showTitle: false,
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w="80%">
                  <MaterialTable
                    columns={confirm_columns}
                    data={orders
                      .filter(
                        (r) =>
                          r.email === authuser[0].email &&
                          r.status === "Confirmed"
                      )
                      .map((rec) => {
                        return { ...rec };
                      })}
                    title="Orders Tables"
                    icons={tableIcons}
                    actions={[
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <GrFormView size="33px" />,
                        tooltip: "View Record",
                        onClick: (event, rowData) => {
                          handleViewOrder(rowData);
                        },
                      }),
                    ]}
                    options={{
                      filtering: false,
                      search: false,
                      toolbar: false,
                      headerStyle: {
                        backgroundColor: "#9AE6B4",
                        color: "black",
                        fontWeight: "bold",
                      },
                      showTitle: false,
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w="80%">
                  <MaterialTable
                    columns={others_columns}
                    data={orders
                      .filter(
                        (r) =>
                          r.email === authuser[0].email &&
                          r.status === "Deleted"
                      )
                      .map((rec) => {
                        return { ...rec };
                      })}
                    title="Orders Tables"
                    icons={tableIcons}
                    actions={[
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <GrFormView size="33px" />,
                        tooltip: "View Record",
                        onClick: (event, rowData) => {
                          handleViewOrder(rowData);
                        },
                      }),
                    ]}
                    options={{
                      filtering: false,
                      search: false,
                      toolbar: false,
                      headerStyle: {
                        backgroundColor: "#9AE6B4",
                        color: "black",
                        fontWeight: "bold",
                      },
                      showTitle: false,
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w="80%">
                  <MaterialTable
                    columns={others_columns}
                    data={orders
                      .filter(
                        (r) =>
                          r.email === authuser[0].email &&
                          r.status === "Delivered"
                      )
                      .map((rec) => {
                        return { ...rec };
                      })}
                    title="Orders Tables"
                    icons={tableIcons}
                    actions={[
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <GrFormView size="33px" />,
                        tooltip: "View Record",
                        onClick: (event, rowData) => {
                          handleViewOrder(rowData);
                        },
                      }),
                    ]}
                    options={{
                      filtering: false,
                      search: false,
                      toolbar: false,
                      headerStyle: {
                        backgroundColor: "#9AE6B4",
                        color: "black",
                        fontWeight: "bold",
                      },
                      showTitle: false,
                    }}
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Modal onClose={onViewOrderClose} size="600px" isOpen={isViewOrderOpen}>
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              {/* <Container maxWidth="container.md" padding={0}> */}
              <Flex
                h={{ base: "auto", md: "180vh" }}
                py={[0, 10, 20]}
                direction={{ base: "column-reverse", md: "row" }}
              >
                <Box
                  overflowY={{ base: "scoll", md: "none" }}
                  //h={{ base: "auto", md: "180vh" }}
                >
                  <OrderInfoView
                    order={[...singleorder]}
                    onClose={onViewOrderClose}
                  />
                </Box>
                <VStack
                  w={{ base: "auto", md: "50%" }}
                  h={{ base: "auto", md: "160vh" }}
                  p="5"
                  spacing="10"
                  alignItems="flex-start"
                  bg="gray.50"
                >
                  <VStack alignItems="flex-start" spacing={3}>
                    <Heading size="2x1">Your cart</Heading>
                    <Heading fontFamily="cursive" color="green" size="md">
                      order no{" "}
                      {singleorder.length > 0 && singleorder[0].orderno}
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
                </VStack>
              </Flex>
              {/* </Container> */}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onViewOrderClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal onClose={onEditOrderClose} size="6xl" isOpen={isEditOrderOpen}>
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              {/* <Container maxWidth="container.md" padding={0}> */}
              <Flex
                h={{ base: "auto", md: "180vh" }}
                py={[0, 10, 20]}
                direction={{ base: "column-reverse", md: "row" }}
              >
                <Box
                  overflowY={{ base: "scoll", md: "none" }}
                  //h={{ base: "auto", md: "180vh" }}
                >
                  <OrderEdit
                    order={[...singleorder]}
                    currentorder={currentorder}
                    setCurrentOrder={setCurrentOrder}
                    updateOrders={updateOrders}
                    onClose={onEditOrderClose}
                  />
                </Box>
                <VStack
                  w={{ base: "auto", md: "60%" }}
                  h={{ base: "auto", md: "160vh" }}
                  p="10"
                  spacing="10"
                  alignItems="flex-start"
                  bg="gray.50"
                >
                  <VStack alignItems="flex-start" spacing={3}>
                    <Heading size="2x1">Your cart</Heading>
                    <Heading fontFamily="cursive" color="green" size="md">
                      order no{" "}
                      {singleorder.length > 0 && singleorder[0].orderno}
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
                </VStack>
              </Flex>
              {/* </Container> */}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onEditOrderClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <AlertDialogBox
          onClose={onAlertDeleteClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertDeleteOpen}
          title="Delete Order"
        >
          <h2>
            Are you sure you want to delete this order {currentorder.orderno}?
          </h2>
        </AlertDialogBox>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default UserOrdersHistory;
