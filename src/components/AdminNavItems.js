import React from "react";
import {
  Flex,
  Text,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NavHoverBox from "./AdminNavHoverBox";

export default function AdminNavItem({
  icon,
  title,
  description,
  active,
  navSize,
}) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <MenuItem onClick={() => alert(title)}>
          <Icon
            as={icon}
            fontSize="xl"
            color={active ? "#82AAAD" : "gray.500"}
          />
          <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
            {title}
          </Text>
        </MenuItem>
        {/* <Link
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize == "large" && "100%"}
        > */}
        {/* <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton> */}
        {/* </Link>
         */}
        {/* <MenuList py={0} border="1px solid red" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
          <MenuItem onClick={() => alert(title)}>{title}</MenuItem>
        </MenuList> */}
      </Menu>
    </Flex>
  );
}
