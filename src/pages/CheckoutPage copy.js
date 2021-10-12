import React from "react";
import styled from "styled-components";
import { RiMotorbikeLine, RiTakeawayFill } from "react-icons/ri";
import { GiCardPickup } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
//MdPayment
import {
  Box,
  Center,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
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
} from "@chakra-ui/react";
import { PageHero } from "../components";
const CheckoutPage = () => {
  return (
    <main>
      <PageHero title="checkout" />
      <Box>
        <SimpleGrid columns={1} spacing={10}>
          <Box align="center" py={10}>
            <Heading size="lg">Your order totals:</Heading>
          </Box>
          <Box px={10} py={10} border="1px solid blue">
            <Box backgroundColor="olive.50" p={1}>
              <SimpleGrid columns={3}>
                <GridItem colSpan={2} align="center">
                  {/* <Box>
                    <Heading size="md">Delivery Mode</Heading>
                  </Box> */}
                  <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Tabs isFitted variant="enclosed">
                      <TabList>
                        <Tab _selected={{ color: "white", bg: "blue.500" }}>
                          <Box px={3}>
                            <GiCardPickup size="40" color="white" />
                          </Box>
                          <Box>
                            <Heading size="lg">Pick Up</Heading>
                          </Box>
                        </Tab>
                        <Tab _selected={{ color: "white", bg: "green.400" }}>
                          <Box px={3}>
                            <RiTakeawayFill size="40" color="white" />
                          </Box>
                          <Box>
                            <Heading size="lg">Delivery</Heading>
                          </Box>
                        </Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel h={250} backgroundColor="blue.50">
                          <Box p={1}>
                            <form>
                              <Stack direction="column">
                                <FormControl id="date">
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftAddon children="Collection Date" />
                                      <Input type="date" w="200" />
                                    </InputGroup>
                                  </HStack>
                                </FormControl>
                                <FormControl id="date">
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftAddon children="Collection Time" />
                                      <Select type="time" w="200">
                                        <option value="option1">
                                          10am to 11am{" "}
                                        </option>
                                        <option value="option2">
                                          11am to 12am
                                        </option>
                                        <option value="option3">
                                          12pm to 1pm
                                        </option>
                                      </Select>
                                    </InputGroup>
                                  </HStack>
                                </FormControl>
                              </Stack>
                            </form>
                          </Box>
                        </TabPanel>
                        <TabPanel h={250} backgroundColor="green.50">
                          <Box p={1}>
                            <form>
                              <Stack direction="column">
                                <FormControl id="houseno">
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftAddon children="House No" />
                                      <Input type="text" w={400} />
                                    </InputGroup>
                                  </HStack>
                                </FormControl>
                                <FormControl id="simpang">
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftAddon children="Simpang" />
                                      <Input type="text" w={400} />
                                    </InputGroup>
                                  </HStack>
                                </FormControl>
                                <FormControl id="location">
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftAddon children="Location/Jln" />
                                      <Input type="text" w={400} />
                                    </InputGroup>
                                  </HStack>
                                </FormControl>
                                <FormControl id="kampong">
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftAddon children="Kampong" />
                                      <Input type="text" w={400} />
                                    </InputGroup>
                                  </HStack>
                                </FormControl>
                                <FormControl id="district">
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftAddon children="District" />
                                      <Select placeholder="Select district">
                                        <option>BSB and Muara</option>
                                        <option>Tutong</option>
                                        <option>Kuala Belait</option>
                                      </Select>
                                    </InputGroup>
                                  </HStack>
                                </FormControl>
                              </Stack>
                            </form>
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                </GridItem>

                <GridItem colSpan={1} align="center" p={2}>
                  <Box
                    backgroundColor="gray.200"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    h={300}
                  >
                    <Box h={55} direction="row" align="center">
                      <HStack align="center" px={150}>
                        <Box px={1}>
                          <MdPayment size="40" color="skyblue" />
                        </Box>
                        <Box>
                          <Heading size="lg">Payment</Heading>
                        </Box>
                      </HStack>
                    </Box>
                    <Box p={1}>
                      <SimpleGrid columns={1}>
                        <form>
                          <Stack direction="column">
                            <FormControl id="date">
                              <HStack>
                                <InputGroup>
                                  <InputLeftAddon children="Address" />
                                  <Input type="address" w={400} />
                                </InputGroup>
                              </HStack>
                            </FormControl>
                            <FormControl id="date">
                              <HStack>
                                <InputGroup>
                                  <InputLeftAddon children="Address" />
                                  <Input type="address" w={400} />
                                </InputGroup>
                              </HStack>
                            </FormControl>
                            <FormControl id="date">
                              <HStack>
                                <InputGroup>
                                  <InputLeftAddon children="Address" />
                                  <Input type="address" w={400} />
                                </InputGroup>
                              </HStack>
                            </FormControl>
                            <FormControl id="date">
                              <HStack>
                                <InputGroup>
                                  <InputLeftAddon children="Address" />
                                  <Input type="address" w={400} />
                                </InputGroup>
                              </HStack>
                            </FormControl>
                          </Stack>
                        </form>
                      </SimpleGrid>
                    </Box>
                  </Box>
                </GridItem>
              </SimpleGrid>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
