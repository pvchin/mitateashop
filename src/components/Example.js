import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Heading,
  HStack,
  GridItem,
  Select,
  SimpleGrid,
  Stack,
  Text,
    VStack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const Example = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const colSpan = useBreakpointValue({base: 2, md: 1})
  return (
    <Container maxWidth="container.xl" padding={0}>
      <Flex
        h={{base: "auto", md: "100vh"}}
        py={[0, 10, 20]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <VStack w="full" h="full" p="10" spacing="10" alignItems="flex-start">
          <VStack spacing="3" alignItems="flex-start">
            <Heading size="xl">Your details</Heading>
            <Text>If you already have a account, please login here</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="John" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Doe" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input placeholder="address" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input placeholder="Gadong" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select>
                  <option value="singapore">Singapore</option>
                  <option value="brunei">Brunei</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Checkbox defaultChecked>Ship to billing address.</Checkbox>
            </GridItem>
            <GridItem colSpan={2}>
              <Button size="lg" w="full">
                Place Order
              </Button>
            </GridItem>
          </SimpleGrid>
        </VStack>
        <VStack
          w="full"
          h="full"
          p="10"
          spacing="10"
          alignItems="flex-start"
          bg={bgColor}
        >
          <VStack alignItems="flex-start" spacing={3}>
            <Heading size="2x1">Your cart</Heading>
            <Text>
              If the price is too hard on your eyes
              <Button
                onClick={toggleColorMode}
                variant="link"
                colorScheme="black"
              >
                try changing the theme
              </Button>
            </Text>
          </VStack>
          <HStack spacing="6" alignItems="center" w="full">
            <AspectRatio ratio={1} w={24}>
              <Image src="/MitaLogo.jpg" alt="Mita Logo" />
            </AspectRatio>
            <Stack
              spacing="0"
              w="full"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack w="full" spacing="0" alignItems="flex-start">
                <Heading size="md">Penny board</Heading>
                <Text color="gray.200">PNYCOMP27541</Text>
              </VStack>
              <Heading size="sm" textAlign="end">
                $119.00
              </Heading>
            </Stack>
          </HStack>
          <VStack spacing="4" alignItems="stretch" w="full">
            <HStack justifyContent="space-between">
              <Text color="gray.600">Subtotal</Text>
              <Heading size="sm">$119.00</Heading>
            </HStack>
            <HStack justifyContent="space-between">
              <Text color="gray.600">Shipping</Text>
              <Heading size="sm">$19.99</Heading>
            </HStack>
            <HStack justifyContent="space-between">
              <Text color="gray.600">Taxes</Text>
              <Heading size="sm">$23.80</Heading>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between">
              <Text color="gray.600">Total</Text>
              <Heading size="lg">$162.79</Heading>
            </HStack>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Example;
