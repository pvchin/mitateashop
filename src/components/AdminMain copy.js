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
import AdminOrdersHistory from "./AdminOrdersHistory";
import ItemsTable from "./ItemsTable";
import AreasTable from "./AreasTable";
import CategoryTable from "./CategoryTable";
import DeliveryPeriodTable from "./DeliveryPeriodTable";
import ToppingsTable from "./ToppingsTable";

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
  const { orders, setOrderId } = useOrders();
  const { singleorder, setSingleOrderId, setSingleOrderNo } = useSingleOrder();
  const { orderitems, setOrderItemId } = useOrderItems();
  const { orderaddon, setOrderAddonId } = useOrderAddon();
  const [currentorder, setCurrentOrder] = useState({});
  const updateOrder = useUpdateOrders();

  return (
    <Container>
      <Flex
        h={{ base: "auto", md: "120vh" }}
        py={[0, 0, 0]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <VStack w="full" h="full" p="10" spacing="10" alignItems="center">
          {/* <Box align="center">
            <Heading size="lg">Admin</Heading>
          </Box> */}
          <Box align="center" w={{ base: "auto", md: "300vh" }}>
            <Tabs align="center" defaultIndex={1} isLazy>
              <TabList>
                <Tab>Items</Tab>
                <Tab>Orders</Tab>
                <Tab>Areas</Tab>
                <Tab>Category</Tab>
                <Tab>Delivery Period</Tab>
                <Tab>Toppings</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box w="80%">
                    <ItemsTable />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box w="80%">
                    <AdminOrdersHistory />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box w="80%">
                    <AreasTable />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box w="80%">
                    <CategoryTable />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box w="80%">
                    <DeliveryPeriodTable />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box w="80%">
                    <ToppingsTable />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};

// const Wrapper = styled.section`
//   .main {
//     height: 600px;
//   }
//   img {
//     width: 100%;
//     display: block;
//     border-radius: var(--radius);
//     object-fit: cover;
//   }
//   .gallery {
//     margin-top: 1rem;
//     display: grid;
//     grid-template-columns: repeat(5, 1fr);
//     column-gap: 1rem;
//     img {
//       height: 100px;
//       cursor: pointer;
//     }
//   }
//   .active {
//     border: 2px solid var(--clr-primary-5);
//   }
//   @media (max-width: 576px) {
//     .main {
//       height: 300px;
//     }
//     .gallery {
//       img {
//         height: 50px;
//       }
//     }
//   }
//   @media (min-width: 992px) {
//     .main {
//       height: 500px;
//     }
//     .gallery {
//       img {
//         height: 75px;
//       }
//     }
//   }
// `;

export default AdminMain;
