import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { images_url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Heading,
  Flex,
  Grid,
  GridItem,
  Image,
  List,
  ListItem,
  Stack,
  VStack,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { createLocalStorageStateHook } from "use-local-storage-state";

const OrderDetails = ({ orderdetails, orderaddon }) => {
  const totalamount = orderdetails
    ? orderdetails.reduce((acc, rec) => {
        return acc + Math.round((rec.totalprice + Number.EPSILON) * 100) / 100;
      }, 0)
    : 0;

  return (
    <Box w="full">
      <List>
        {orderdetails &&
          orderdetails.map((rec) => {
            const {
              orderitemid,
              image,
              name,
              qty,
              price,
              size,
              nettprice,
              totalprice,
              sugarlevel,
              icelevel,
              addon,
            } = rec;
            return (
              <ListItem>
                <Box>
                  <Grid templateColumns="repeat(8, 1fr)">
                    <GridItem colSpan="1">
                      <Box w="100" p={1}>
                        <AspectRatio maxW="100px" ratio={1}>
                          <img src={`${images_url}${image}`} alt={name} />
                        </AspectRatio>
                      </Box>
                    </GridItem>
                    <GridItem colSpan="4">
                      <Box>
                        <Text
                          size={{
                            base: "sm", // 0-48em
                            md: "sm", // 48em-80em,
                            xl: "md", // 80em+
                          }}
                          fontWeight="bold"
                        >
                          {name}
                        </Text>
                        <Text
                          fontSize={{
                            base: "12px", // 0-48em
                            md: "12px", // 48em-80em,
                            xl: "14px", // 80em+
                          }}
                        >
                          Size: {size}
                        </Text>
                        {addon &&
                          addon
                            .filter(
                              (r) =>
                                r.orderitemid === orderitemid &&
                                r.checked === true
                            )
                            .map((item) => {
                              return (
                                <Text
                                  fontSize={{
                                    base: "12px", // 0-48em
                                    md: "12px", // 48em-80em,
                                    xl: "14px", // 80em+
                                  }}
                                >
                                  {item.description}
                                </Text>
                              );
                            })}
                        <Text
                          fontSize={{
                            base: "12px", // 0-48em
                            md: "12px", // 48em-80em,
                            xl: "14px", // 80em+
                          }}
                        >
                          Ice: {icelevel}% Sugar: {sugarlevel}%
                        </Text>
                      </Box>
                    </GridItem>
                    <GridItem colSpan="1" pl={4}>
                      <Box>{qty}</Box>
                    </GridItem>
                    <GridItem colSpan="1">
                      <Box>{formatPrice(nettprice)}</Box>
                    </GridItem>
                    <GridItem colSpan="1">
                      <Box>{formatPrice(totalprice)}</Box>
                    </GridItem>
                  </Grid>
                </Box>
              </ListItem>
            );
          })}
      </List>
      <Divider
        mt={2}
        mb={2}
        colorScheme="red"
        borderColor="blue.300"
        border="1px"
      />
      <Box>
        {totalamount === 0 ? (
          <Heading size="sm">Your cart is empty!</Heading>
        ) : (
          <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(8, 1fr)">
            <GridItem rowSpan={1} colSpan={6} />
            <GridItem rowSpan={1} colSpan={1}>
              <Text fontFamily="cursive" fontSize="15" fontWeight="bold">
                Total
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text fontFamily="cursive" fontSize="15">
                {formatPrice(totalamount)}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1} />
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default OrderDetails;
