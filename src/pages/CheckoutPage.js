import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { carts_localstorage_key } from "../utils/constants";
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
import { useCustomToast } from "../helpers/useCustomToast";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { orderState } from "../data/atomdata";
import { formatPrice } from "../utils/helpers";
import { PageHero } from "../components";
import OrderDetails from "../components/OrderDetails";
import OrderInfo from "../components/OrderInfo";
import { useAuthUser } from "../react-query/auth/useAuthUser";
import { useUsers } from "../react-query/users/useUsers";
//import { useSingleOrder } from "../components/react-query/orders/useSingleOrder";
import { useOrderItems } from "../react-query/orderitems/useOrderItems";
import { useOrderAddon } from "../react-query/orderaddon/useOrderAddon";
import { useUpdateOrders } from "../react-query/orders/useUpdateOrders";
import { useAreas } from "../react-query/area/useAreas";

const CheckoutPage = () => {
  const toast = useCustomToast();
  const history = useHistory();
  const { toggleColorMode } = useColorMode();
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
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
              {/* <Heading fontFamily="cursive" color="green" size="md">
                order no {order.orderno}
              </Heading> */}
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
                  // orderdetails={orderitems}
                  // orderaddon={orderaddon}
                  orderdetails={mcarts}
                  orderaddon={mcarts}
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
      </Box>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
