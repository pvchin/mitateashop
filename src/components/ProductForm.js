import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { formatPrice } from "../utils/helpers";
import { FiSave } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { useHistory } from "react-router-dom";
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
  IconButton,
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
  Wrap,
  WrapItem,
  useRadio,
  useRadioGroup,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { orderItemState } from "../data/atomdata";
import { images_url } from "../utils/constants";
import { useItems } from "../react-query/items/useItems";

const initial_product = [
  {
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
  },
];

export default function ProductForm({
  state,
  setState,
  add_Item,
  update_Item,
  statustype,
  onProductClose,
}) {
  const history = useHistory();
  const field_width = "120";
  const { items } = useItems();
  const [features, setFeatures] = useState(false);
  const [newitem, setNewItem] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting, id },
  } = useForm({
    defaultValues: {
      ...state,
    },
  });

  const onSubmit = (values) => {
    if (statustype === "edit") {
      update_Item(values);
    }
    if (statustype === "add") {
      add_Item(values);
    }
  };

  const handleClose = () => {
    onProductClose();
  };

  const handleGetNewItemNo = () => {
    const array = items.sort((a, b) => (a.itemno > b.itemno ? 1 : -1));
    const lastno = 10000 + parseInt(array.at(-1).itemno.substring(1)) + 1;
    const newno = "M" + lastno.toString().substring(1);
    const data = { ...state, itemno: newno };
    setState((prev) => (prev = { ...data }));
  };

  useEffect(() => {
    setFeatures(state.featured);
    setNewItem(state.newarrival);
  }, []);

  return (
    <Container maxWidth="container.xl" padding={0}>
      <Flex
        h={{ base: "auto", md: "650" }}
        py={[0, 0, 0]}
        direction={{ base: "column-reverse", md: "row" }}
        overflowY="scroll"
      >
        <VStack
          w={{ base: "auto", md: "full" }}
          h={{ base: "auto", md: "600" }}
          p="2"
          spacing="10"
          alignItems="flex-start"
        >
          <VStack pt={5} spacing="3" alignItems="center">
            <Heading size="xl">Product Form</Heading>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              templateColumns="12"
              templateRows="7"
              columnGap={3}
              rowGap={3}
              px={5}
              w={{ base: "auto", md: "full", lg: "full" }}
              border="1px solid black"
              borderRadius="20"
              backgroundColor="blue.50"
            >
              <GridItem colSpan={3} mt={5}>
                <HStack>
                  <FormControl>
                    <Controller
                      control={control}
                      name="itemno"
                      defaultValue={state.itemno}
                      render={({ field: { onChange, value, ref } }) => (
                        <InputGroup>
                          <HStack w="100%" py={1}>
                            <InputLeftAddon
                              children="Item No"
                              minWidth={field_width}
                            />
                            <Input
                              name="itemno"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="item no"
                            />
                          </HStack>
                        </InputGroup>
                      )}
                    />
                  </FormControl>

                  <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<AiOutlinePlus />}
                    onClick={handleGetNewItemNo}
                  />
                </HStack>
              </GridItem>
              <GridItem colSpan={6} mt={5}>
                <FormControl>
                  <Controller
                    control={control}
                    name="name"
                    defaultValue={state.name}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Name"
                            minWidth={field_width}
                          />
                          <Input
                            name="name"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="name"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={3} rowSpan={5} mt={5}>
                {/* <Box
                  p={1}
                  position="relative"
                  boxSize={300}
                  h={300}
                  align="center"
                > */}
                {/* <AspectRatio maxW={500} ratio={1} align="center"> */}
                {/* <Wrap
                      w={300}
                      h={300}
                      px="1rem"
                      spacing={4}
                      justify="center"
                    > */}
                {/* <WrapItem
                        w="280px"
                        h="330px"
                        boxShadow="base"
                        rounded="20px"
                        overflow="hidden"
                        bg="white"
                        lineHeight="0"
                        //_hover={{ boxShadow: "dark-lg" }}
                      > */}
                <Image
                  boxSize="300px"
                  src={`${images_url}${state.image}`}
                  fallbackSrc="https://via.placeholder.com/250"
                  alt="blank"
                  //display="block"
                  objectFit="cover"
                />
                {/* </WrapItem> */}
                {/* </Wrap> */}
                {/* </AspectRatio> */}
                {/* </Box> */}
              </GridItem>
              <GridItem colSpan={9} w="full">
                <FormControl>
                  <Controller
                    control={control}
                    name="description"
                    defaultValue={state.description}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Description"
                            minWidth={field_width}
                          />
                          <Input
                            name="description"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="description"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={9}>
                <FormControl>
                  <Controller
                    control={control}
                    name="itemdescription"
                    defaultValue={state.itemdescription}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Introduction"
                            minWidth={field_width}
                          />
                          <Input
                            name="itemdescription"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="Introduction"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={9}>
                <FormControl>
                  <Controller
                    control={control}
                    name="category"
                    defaultValue={state.category}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Category"
                            minWidth={field_width}
                          />
                          <Input
                            name="category"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="category"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={9}>
                <FormControl>
                  <Controller
                    control={control}
                    name="image"
                    defaultValue={state.image}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Image"
                            minWidth={field_width}
                          />
                          <Input
                            name="image"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="image"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={6}>
                <FormControl>
                  <Controller
                    control={control}
                    name="price"
                    defaultValue={state.price}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Price"
                            minWidth={field_width}
                          />
                          <Input
                            name="price"
                            value={value}
                            type="number"
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="price"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl>
                  <Controller
                    control={control}
                    name="mprice"
                    defaultValue={state.mprice}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Price (M)"
                            minWidth={field_width}
                          />
                          <Input
                            name="mprice"
                            value={value}
                            type="number"
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="price (M)"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl>
                  <Controller
                    control={control}
                    name="lprice"
                    defaultValue={state.lprice}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Price (L)"
                            minWidth={field_width}
                          />
                          <Input
                            name="lprice"
                            value={value}
                            type="number"
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="price (L)"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={12}>
                <Divider borderWidth={1} borderColor="teal" />
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="issize"
                    defaultValue={state.issize}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          {/* <InputLeftAddon
                            children="Size"
                            minWidth={field_width}
                          /> */}
                          <Checkbox
                            name="issize"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                          >
                            Bess Seller
                          </Checkbox>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="issize"
                    defaultValue={state.issize}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          {/* <InputLeftAddon
                            children="Size"
                            minWidth={field_width}
                          /> */}
                          <Checkbox
                            name="issize"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                          >
                            Size
                          </Checkbox>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="issize"
                    defaultValue={state.issize}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          {/* <InputLeftAddon
                            children="Size"
                            minWidth={field_width}
                          /> */}
                          <Checkbox
                            name="issize"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                          >
                            New Item 
                          </Checkbox>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="issize"
                    defaultValue={state.issize}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          {/* <InputLeftAddon
                            children="Size"
                            minWidth={field_width}
                          /> */}
                          <Checkbox
                            name="issize"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                          >
                            Drink Item
                          </Checkbox>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="issize"
                    defaultValue={state.issize}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          {/* <InputLeftAddon
                            children="Size"
                            minWidth={field_width}
                          /> */}
                          <Checkbox
                            name="issize"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                          >
                            Penefits
                          </Checkbox>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="issize"
                    defaultValue={state.issize}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          {/* <InputLeftAddon
                            children="Size"
                            minWidth={field_width}
                          /> */}
                          <Checkbox
                            name="issize"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                          >
                            Free Delivery
                          </Checkbox>
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={12}>
                <Divider borderWidth={1} borderColor="teal" />
              </GridItem>
              <GridItem colSpan={12}>
                <ButtonGroup py={5}>
                  <Button
                    leftIcon={<FiSave />}
                    variant="solid"
                    bg="blue.200"
                    isFullWidth
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    leftIcon={<ImExit />}
                    variant="solid"
                    bg="blue.200"
                    isFullWidth
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </ButtonGroup>
              </GridItem>
            </Grid>
          </form>
        </VStack>
      </Flex>
    </Container>
  );
}
