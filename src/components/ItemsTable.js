import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import MaterialTable, { MTableToolbar } from "material-table";
import { GrFormView } from "react-icons/gr";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
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
import { useItems } from "../react-query/items/useItems";
import { useUpdateItems } from "../react-query/items/useUpdateItems";
import { useAddItems } from "../react-query/items/useCreateItems";
import { useDeleteItems } from "../react-query/items/useDeleteItems";
import ProductForm from "./ProductForm";

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

const initial_product = {
  itemno: "",
  name: "",
  description: "",
  itemdescription: "",
  image: "",
  company: "",
  category: "",
  shipping: false,
  featured: false,
  price: 0,
  mprice: 0,
  lprice: 0,
  size: "",
  issize: false,
};

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

const ItemsTable = () => {
  const { items } = useItems();
  const updateItem = useUpdateItems();
  const addItem = useAddItems();
  const deleteItem = useDeleteItems();
  const [state, setState] = useState({});
  const [statustype, setStatusType] = useState("");
  const {
    isOpen: isAlertDeleteOpen,
    onOpen: onAlertDeleteOpen,
    onClose: onAlertDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isProductOpen,
    onOpen: onProductOpen,
    onClose: onProductClose,
  } = useDisclosure();

  const handleEditItem = (data) => {
    setState(data);
    onProductOpen(true);
  };

  const handleAddItem = () => {
    const array = items.sort((a, b) => (a.itemno > b.itemno ? 1 : -1));
    const lastno = 10000 + parseInt(array.at(-1).itemno.substring(1)) + 1;
    const newno = "M" + lastno.toString().substring(1);
    const data = { ...initial_product, itemno: newno };
    setState(data);
    onProductOpen(true);
  };

  const update_Item = (data) => {
    const { id, rec_id, tableData, ...fields } = data;
    updateItem({ id, ...fields });
  };

  const add_Item = (data) => {
    addItem(data);
  };

  const delete_Item = (id) => {
    deleteItem(id);
  };

  const handleDeleteItem = (rowData) => {
    setState(prev => prev = { ...rowData });
    onAlertDeleteOpen();
   
  };

  const handleOnDeleteConfirm = () => {
    const { id } = state;
    delete_Item(id);
    // toast({
    //   title: "Order being deleted!",
    //   status: "warning",
    // });
  };

  return (
    <Box alignContent="center" alignItems="center">
      <VStack align="center" w="auto" h={{ base: "auto", md: "100vh" }}>
        <MaterialTable
          columns={confirm_columns}
          data={items}
          title="Product Tables"
          icons={tableIcons}
          actions={[
            {
              icon: () => <AiOutlinePlus size="30px" />,
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                setStatusType((prev) => (prev = "add"));
                handleAddItem(rowData);
              },
            },
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <AiFillEdit size="30px" />,
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                setStatusType((prev) => (prev = "edit"));
                handleEditItem(rowData);
              },
            }),
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <AiFillDelete />,
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                handleDeleteItem(rowData);
              },
            }),
          ]}
          options={{
            filtering: false,
            search: true,
            toolbar: true,
            headerStyle: {
              backgroundColor: "#9AE6B4",
              color: "black",
              fontWeight: "bold",
            },
            showTitle: true,
          }}
        />
      </VStack>
      <Modal isOpen={isProductOpen} onClose={onProductClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Product Form</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <ProductForm
              state={state}
              setState={setState}
              add_Item={add_Item}
              update_Item={update_Item}
              statustype={statustype}
              onProductClose={onProductClose}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onProductClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialogBox
        onClose={onAlertDeleteClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertDeleteOpen}
        title="Delete Product"
      >
        <Heading size="md">
          Are you sure you want to delete this product {state.itemno} {state.name} ?
        </Heading>
      </AlertDialogBox>
    </Box>
  );
};

export default ItemsTable;
