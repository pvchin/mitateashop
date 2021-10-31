import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import MaterialTable, { MTableToolbar } from "material-table";
import { GrFormView } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useRecoilState } from "recoil";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
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
import { useCategory } from "../react-query/category/useCategory";
import { useAddCategory } from "../react-query/category/useCreateCategory";
import { useUpdateCategory } from "../react-query/category/useUpdateCategory";
import { useDeleteCategory } from "../react-query/category/useDeleteCategory";

const columns = [
  {
    title: "Category",
    field: "name",
  },
 
];

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const CategoryTable = () => {
  const { category } = useCategory();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const update_Category = (data) => {
    const { id, rec_id, ...fields } = data;
    updateCategory({ id, ...fields });
  };

  const add_Category = (data) => {
    const { ...fields } = data;
    addCategory({ ...fields });
  };

  const delete_Category = (data) => {
    const { id } = data;
    deleteCategory(id);
  };

  return (
    <VStack>
      <Box w="600px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={category}
          title="Category"
          icons={tableIcons}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Category(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Category(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Category(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            pageSize: 5,
              filtering: true,
            paging: false,
            headerStyle: {
              backgroundColor: "#9AE6B4",
              color: "black",
            },
            showTitle: true,
          }}
        />
      </Box>
    </VStack>
  );
};

export default CategoryTable;
