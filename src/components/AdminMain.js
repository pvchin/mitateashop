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
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
// import { useOrders } from "../react-query/orders/useOrders";
// import { useSingleOrder } from "../react-query/orders/useSingleOrder";
// import { useOrderItems } from "../react-query/orderitems/useOrderItems";
// import { useOrderAddon } from "../react-query/orderaddon/useOrderAddon";
import { useUpdateOrders } from "../react-query/orders/useUpdateOrders";
import { useUserContext } from "../context/user_context";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import OrderDetails from "../components/OrderDetails";
import OrderInfoView from "../components/OrderInfoView";
import OrderDelivery from "../components/OrderDelivery";
import OrderDelete from "./OrderDelete";
import AdminOrdersHistory from "./AdminOrdersHistory";
import ItemsTable from "./ItemsTable";
import AreasTable from "./AreasTable";
import CategoryTable from "./CategoryTable";
import DeliveryPeriodTable from "./DeliveryPeriodTable";
import ToppingsTable from "./ToppingsTable";
import AdminSidebar from "./AdminSidebar";

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
const AdminMain = () => {
  const toast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // const { orders, setOrderId } = useOrders();
  // const { singleorder, setSingleOrderId, setSingleOrderNo } = useSingleOrder();
  // const { orderitems, setOrderItemId } = useOrderItems();
  // const { orderaddon, setOrderAddonId } = useOrderAddon();
  const [currentorder, setCurrentOrder] = useState({});
  const [select, setSelect] = useState("confirmorders");
  const updateOrder = useUpdateOrders();

  const SwitchCase = () => {
    switch (select) {
      case "confirmorders":
        return <AdminOrdersHistory status="Confirmed" />;
      case "deliveryorders":
        return <AdminOrdersHistory status="Delivered" />;
      case "deletedorders":
        return <AdminOrdersHistory status="Deleted" />;
      case "items":
        return <ItemsTable />;
      case "category":
        return <CategoryTable />;
      case "deliveryperiod":
        return <DeliveryPeriodTable />;
      case "area":
        return <AreasTable />;
      case "toppings":
        return <ToppingsTable />;
      default:
        return "You are not authorised user!";
    }
  };

  return (
    <Flex w="100%" h="600" overflow="scroll">
      <AdminSidebar setSelect={setSelect} />
      <Flex mt={50} w="full" h="100%" justify="center">
        <SwitchCase />
      </Flex>
    </Flex>
  );
};

export default AdminMain;
