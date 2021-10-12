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
import { useCustomToast } from "../helpers/useCustomToast";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useItems } from "../react-query/items/useItems";

const confirm_columns = [
  {
    title: "Item No",
    field: "itemno",
  },
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "Description",
    field: "description",
    editable: "never",
  },
  {
    title: "Price",
    field: "price",
    type: "currency",
    editable: "never",
  },
  {
    title: "Image",
    field: "image",
    editable: "never",
  },
  {
    title: "Category",
    field: "category",
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

const ItemsTable = () => {
  const { items } = useItems();
  return (
    <Box alignContent="center" alignItems="center">
      <VStack align="center" w="auto" h={{ base: "auto", md: "100vh" }}>
        <MaterialTable
          columns={confirm_columns}
          data={items}
          title="Orders Tables"
          icons={tableIcons}
          actions={[
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <AiFillEdit size="30px" />,
              tooltip: "Edit Record",
              //   onClick: (event, rowData) => {
              //     handleEditOrder(rowData);
              //   },
            }),
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <AiFillDelete />,
              tooltip: "Delete Record",
              //   onClick: (event, rowData) => {
              //     handleDeleteOrder(rowData);
              //   },
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
      </VStack>
    </Box>
  );
};

export default ItemsTable;
