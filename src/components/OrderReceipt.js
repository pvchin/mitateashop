import React, { useState, useEffect } from "react";
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
// import { useSingleOrder } from "../react-query/orders/useSingleOrder";
// import { useOrderItems } from "../react-query/orderitems/useOrderItems";
// import { useOrderAddon } from "../react-query/orderaddon/useOrderAddon";
import { formatPrice } from "../utils/helpers";
import OrderInfo from "./OrderInfo";
import OrderDetails from "./OrderDetails";

const OrderReceipt = ({ currentorder }) => {
  const FIELDWIDTH = 50;
  //   const { singleorder, setSingleOrderId } = useSingleOrder();
  //   const { orderitems, setOrderItemId } = useOrderItems();
  //   const { orderaddon, setOrderAddonId } = useOrderAddon();
  console.log("currentorder", currentorder);
  //   useEffect(() => {
  //     setSingleOrderId(currentorder.orderid);
  //     setOrderAddonId(currentorder.orderno);
  //     setOrderItemId(currentorder.orderno);
  //   }, [currentorder]);
  const {
    orderid,
    orderno,
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
  } = currentorder;

  return (
    <Box borderRadius="20" w={500}>
      <Stack>
        <Heading size="md">Order # {orderno}</Heading>
        <Divider />
        <VStack>
          <Grid w={500} templateColumns="repeat(10, 1fr)" gap={2} p={2}>
            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Name</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{custname}</Text>
              </Box>
            </GridItem>

            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Phone</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{phone}</Text>
              </Box>
            </GridItem>

            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Address</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{address1}</Text>
              </Box>
            </GridItem>

            <GridItem colSpan={3}>
              <Box>
                <Text></Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{address2}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Area</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{area}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Request Date</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{requestdate}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Request Time</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{requesttime}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Delivery Mode</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{deliverymode}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Payment Mode</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{paymentmode}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box>
                <Text fontWeight="bold">Total Amount</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={7}>
              <Box>
                <Text>{formatPrice(nettamount)}</Text>
              </Box>
            </GridItem>
          </Grid>
        </VStack>
        {/* <Text>Name: {custname}</Text>
        <Text>Phone: {phone}</Text>
        <Text>Address: {address1}</Text>
        <Text>Address: {address1}</Text> */}
        {/* <OrderInfo order={[...singleorder]} /> */}
        {/* <OrderDetails orderdetails={orderitems} orderaddon={orderaddon} /> */}
      </Stack>
    </Box>
  );
};

export default OrderReceipt;
