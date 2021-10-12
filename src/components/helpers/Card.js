import {
  Box,
  Center,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { images_url } from "../../utils/constants";

export function Card({ itemName, image, cardContents }) {
  return (
    <Center py={12}>
      <Box
        p={6}
        maxW="330px"
        w="full"
        bg="white"
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box rounded="lg" mt={-12} pos="relative" height="230px">
          <Image
            rounded="lg"
            height={230}
            width={282}
            objectFit="cover"
            src={`${images_url}/${image.fileName}`}
            alt={itemName}
          />
          <Text fontSize="xs" align="center">
            Photo by <Link href={image.authorLink}>{image.authorName}</Link>{" "}
            from <Link href={image.platformLink}>{image.platformName}</Link>
          </Text>
        </Box>
        <Stack pt={10}>
          <Heading align="center" fontSize="2xl">
            {itemName}
          </Heading>
          {cardContents}
        </Stack>
      </Box>
    </Center>
  );
}
