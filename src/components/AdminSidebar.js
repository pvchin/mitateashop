import React, { useState } from "react";
import {
  Flex,
  Text,
  Icon,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Menu,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import NavItem from "./AdminNavItems";
import ItemsTable from "./ItemsTable";

export default function AdminSidebar({ setSelect }) {
  const menu_top = "5";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="0vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "250px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          size="lg"
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <Menu
          isLazy
          placement="right"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          <MenuItem pt={menu_top} onClick={() => setSelect("confirmorders")}>
            <Icon
              as={FiCalendar}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Confirmed Orders
            </Text>
          </MenuItem>
          <MenuItem pt={menu_top} onClick={() => setSelect("deliveryorders")}>
            <Icon
              as={FiUser}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Delivered Orders
            </Text>
          </MenuItem>
          <MenuItem pt={menu_top} onClick={() => setSelect("deletedorders")}>
            <Icon
              as={FiUser}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Deleted Orders
            </Text>
          </MenuItem>
          <MenuItem pt={menu_top} onClick={() => setSelect("items")}>
            <Icon
              as={FiCalendar}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Products
            </Text>
          </MenuItem>
          <MenuItem pt={menu_top} onClick={() => setSelect("category")}>
            <Icon
              as={IoPawOutline}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Category
            </Text>
          </MenuItem>
          <MenuItem pt={menu_top} onClick={() => setSelect("area")}>
            <Icon
              as={FiDollarSign}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Area
            </Text>
          </MenuItem>
          <MenuItem pt={menu_top} onClick={() => setSelect("deliveryperiod")}>
            <Icon
              as={FiBriefcase}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Delivery Period
            </Text>
          </MenuItem>
          <MenuItem pt={menu_top} onClick={() => setSelect("toppings")}>
            <Icon
              as={FiSettings}
              fontSize="xl"
              //color={active ? "#82AAAD" : "gray.500"}
            />
            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
              Toppings
            </Text>
          </MenuItem>
        </Menu>
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              Mita Tea Shop
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
