import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import MaterialTable, { MTableToolbar } from "material-table";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GrFormView, GrDeliver } from "react-icons/gr";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import FilterList from "@material-ui/icons/FilterList";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  HStack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import { useCustomToast } from "../helpers/useCustomToast";
import { useOrders } from "../react-query/orders/useOrders";
import { useSingleOrder } from "../react-query/orders/useSingleOrder";
import { useOrderItems } from "../react-query/orderitems/useOrderItems";
import { useOrderAddon } from "../react-query/orderaddon/useOrderAddon";
import { useUpdateOrders } from "../react-query/orders/useUpdateOrders";
import { useUserContext } from "../context/user_context";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import OrderDetails from "../components/OrderDetails";
import OrderInfoView from "../components/OrderInfoView";
import OrderDelivery from "../components/OrderDelivery";
import OrderDelete from "./OrderDelete";

const confirm_columns = [
  {
    title: "Order No",
    field: "orderno",
    width: "80px",
  },
  {
    title: "Name",
    field: "custname",
    editable: "never",
  },
  {
    title: "Area",
    field: "area",
    width: "100px",
    editable: "never",
  },
  {
    title: "Request Date",
    field: "requestdate",
    type: "date",
    dateSetting: { locale: "en-GB" },
    width: "80px",
    editable: "never",
  },
  {
    title: "Request Time",
    field: "requesttime",
    width: "140px",
    editable: "never",
  },
  {
    title: "Delivery Mode",
    field: "deliverymode",
    width: "80px",
    editable: "never",
  },
  {
    title: "Order Amount ",
    field: "grossamount",
    type: "currency",
    width: "80px",
    editable: "never",
  },
  {
    title: "Delivery Fee ",
    field: "deliveryfee",
    type: "currency",
    width: "80px",
    editable: "never",
  },
  {
    title: "Total Amount ",
    field: "nettamount",
    type: "currency",
    width: "80px",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    width: "80px",
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
    width: "80px",
  },
  {
    title: "Name",
    field: "custname",
    editable: "never",
  },
  {
    title: "Order Amount ",
    field: "grossamount",
    type: "currency",
    width: "80px",
    editable: "never",
  },
  {
    title: "Area",
    field: "area",
    width: "100px",
    editable: "never",
  },
  {
    title: "Request Date",
    field: "requestdate",
    type: "date",
    dateSetting: { locale: "en-GB" },
    width: "80px",
    editable: "never",
  },
  {
    title: "Request Time",
    field: "requesttime",
    width: "140px",
    editable: "never",
  },
  {
    title: "Delivery Mode",
    field: "deliverymode",
    width: "80px",
    editable: "never",
  },
  {
    title: "Delivery Fee ",
    field: "deliveryfee",
    type: "currency",
    width: "80px",
    editable: "never",
  },
  {
    title: "Total Amount ",
    field: "nettamount",
    type: "currency",
    width: "80px",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    width: "80px",
    editable: "never",
  },
  {
    title: "Comments",
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
const UserOrdersHistory = () => {
  const toast = useCustomToast();
  const { orders, setOrderId } = useOrders();
  const { singleorder, setSingleOrderId, setSingleOrderNo } = useSingleOrder();
  const { orderitems, setOrderItemId } = useOrderItems();
  const { orderaddon, setOrderAddonId } = useOrderAddon();
  const [currentorder, setCurrentOrder] = useState({});
  const updateOrder = useUpdateOrders();
  const {
    isOpen: isDeleteOrderOpen,
    onOpen: onDeleteOrderOpen,
    onClose: onDeleteOrderClose,
  } = useDisclosure();
  const {
    isOpen: isViewOrderOpen,
    onOpen: onViewOrderOpen,
    onClose: onViewOrderClose,
  } = useDisclosure();
  const {
    isOpen: isDeliverOrderOpen,
    onOpen: onDeliverOrderOpen,
    onClose: onDeliverOrderClose,
  } = useDisclosure();

  const handleViewOrder = (rowData) => {
    let todayDate = new Date();
    setCurrentOrder({ orderid: rowData.id, orderno: rowData.orderno });
    setSingleOrderId(rowData.email);
    setSingleOrderNo(rowData.orderno);
    setOrderItemId(rowData.orderno);
    setOrderAddonId(rowData.orderno);
    onViewOrderOpen();
  };

  const handleDeleteOrder = (rowData) => {
    setCurrentOrder({
      orderid: rowData.id,
      orderno: rowData.orderno,
      deliverydate: dayjs().format("YYYY-MM-DD"),
      deliverytime: dayjs().format("HH:mm:ss"),
    });

    onDeleteOrderOpen();
  };

  // const handleDeleteOrderConfirm = () => {
  //   updateOrder({
  //     id: currentorder.orderid,
  //     status: "Deleted",
  //     comments: `On ${Date().toLocaleString()}`,
  //   });
  //   toast({
  //     title: "Order being deleted!",
  //     status: "warning",
  //   });
  //   onDeleteClose();
  // };

  const handleDeliverOrder = (rowData) => {
    setCurrentOrder({
      orderid: rowData.id,
      orderno: rowData.orderno,
      deliverydate: dayjs().format("YYYY-MM-DD"),
    });
    onDeliverOrderOpen();
  };

  return (
    <Wrapper>
      <Box>
        {/* <Box align="center">
          <Heading>Admin Orders History</Heading>
        </Box> */}
        <Box align="center">
          <Tabs align="center">
            <TabList>
              <Tab>Confirmed</Tab>
              <Tab>Deleted</Tab>
              <Tab>Delivered</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box w="80%">
                  {/* <MaterialTable
                    columns={confirm_columns}
                    data={
                      orders &&
                      orders
                        .filter((r) => r.status === "Confirmed")
                        .map((rec) => {
                          return { ...rec };
                        })
                    }
                    title="Orders Tables"
                    icons={tableIcons}
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
                    actions={[
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <GrFormView size="33px" />,
                        tooltip: "View Order",
                        onClick: (event, rowData) => {
                          handleViewOrder(rowData);
                        },
                      }),
                      (rowData) => ({
                        // disabled: rowData.status !== "Pending",
                        icon: () => <AiFillDelete />,
                        tooltip: "Delete Order",
                        onClick: (event, rowData) => {
                          handleDeleteOrder(rowData);
                        },
                      }),
                      (rowData) => ({
                        // disabled: rowData.status !== "Pending",
                        icon: () => <GrDeliver />,
                        tooltip: "Deliver Order",
                        onClick: (event, rowData) => {
                          handleDeliverOrder(rowData);
                        },
                      }),
                    ]}
                  /> */}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w="80%">
                  {/* <MaterialTable
                    columns={others_columns}
                    data={orders
                      .filter((r) => r.status === "Deleted")
                      .map((rec) => {
                        return { ...rec };
                      })}
                    title="Orders Tables"
                    icons={tableIcons}
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
                    actions={[
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <GrFormView size="33px" />,
                        tooltip: "View Order",
                        onClick: (event, rowData) => {
                          handleViewOrder(rowData);
                        },
                      }),
                    ]}
                  /> */}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w="80%">
                  {/* <MaterialTable
                    columns={others_columns}
                    data={orders
                      .filter((r) => r.status === "Delivered")
                      .map((rec) => {
                        return { ...rec };
                      })}
                    title="Orders Tables"
                    icons={tableIcons}
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
                    actions={[
                      (rowData) => ({
                        //disabled: rowData.status !== "Pending",
                        icon: () => <GrFormView size="33px" />,
                        tooltip: "View Order",
                        onClick: (event, rowData) => {
                          handleViewOrder(rowData);
                        },
                      }),
                    ]}
                  /> */}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Modal onClose={onViewOrderClose} size="6xl" isOpen={isViewOrderOpen}>
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
                  <OrderInfoView order={[...singleorder]} />
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
              <Button onClick={onViewOrderClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          w="500px"
          h="200px"
          isOpen={isDeliverOrderOpen}
          onClose={onDeliverOrderClose}
        >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Order Delivery #{currentorder.orderno}</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              <HStack>
                <OrderDelivery
                  currentorder={currentorder}
                  setCurrentOrder={setCurrentOrder}
                  updateOrder={updateOrder}
                  onClose={onDeliverOrderClose}
                />
              </HStack>
            </ModalBody>

            {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onDeliverOrderClose}>
                Submit
              </Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
        <Modal
          w="500px"
          h="200px"
          isOpen={isDeleteOrderOpen}
          onClose={onDeleteOrderClose}
        >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Order Delivery #{currentorder.orderno}</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              <HStack>
                <OrderDelete
                  currentorder={currentorder}
                  setCurrentOrder={setCurrentOrder}
                  updateOrder={updateOrder}
                  onClose={onDeleteOrderClose}
                />
              </HStack>
            </ModalBody>

            {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onDeliverOrderClose}>
                Submit
              </Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
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
