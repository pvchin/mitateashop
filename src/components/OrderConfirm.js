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

const OrderReceipt = ({ neworderno }) => {
  const FIELDWIDTH = 50;
  //   const { singleorder, setSingleOrderId } = useSingleOrder();
  //   const { orderitems, setOrderItemId } = useOrderItems();
  //   const { orderaddon, setOrderAddonId } = useOrderAddon();
  //console.log("currentorder", currentorder);
  //   useEffect(() => {
  //     setSingleOrderId(currentorder.orderid);
  //     setOrderAddonId(currentorder.orderno);
  //     setOrderItemId(currentorder.orderno);
  //   }, [currentorder]);
  

  return (
    <Box borderRadius="20" w={500}>
      <Stack>
        <Heading size="md">Order # {neworderno}</Heading>
        <Divider />
        <Heading size="md">Thank you !</Heading>
        <Text>Pls refer to My Order for details!</Text>
      </Stack>
    </Box>
  );
};

export default OrderReceipt;
