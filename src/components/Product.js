import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { formatPrice } from "../utils/helpers";
import { GiShoppingCart } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { orderItemState } from "../data/atomdata";
import { images_url } from "../utils/constants";
import { useOrderItems } from "../react-query/orderitems/useOrderItems";
import { useAddOrderItems } from "../react-query/orderitems/useCreateOrderItems";
import { useUpdateOrderItems } from "../react-query/orderitems/useUpdateOrderItems";

const Product = ({ id, image, name, price, mprice, lprice, size }) => {
  const history = useHistory();
  const [orderitem, setOrderItem] = useRecoilState(orderItemState);
  const AddToCart = (e) => {
    e.preventDefault();

    setOrderItem({
      id: uuidv4(),
      itemid: id,
      name: name,
      price: price,
      image: image,
      totalprice: price,
      toppings: [],
      sugarlevel: "50",
      icelevel: "50",
      mprice: mprice,
      lprice: lprice,
      size: size,
    });
    history.push("/singleproduct");
  };

  return (
    <Wrapper>
      <Container>
        <Box
          alignItems="center"
          rounded="20px"
          overflow="hidden"
          bg="white"
          lineHeight="0"
          boxShadow="base"
          _hover={{ boxShadow: "dark-lg" }}
        >
          {/* <AspectRatio maxW="280px" ratio={1}> */}
          {/* <AspectRatio maxW="500px" ratio={1}> */}
          {/* <Wrap w="300px" h="300px" px="1rem" spacing={4} justify="center">
              <WrapItem
                w="280px"
                h="280px"
                boxShadow="base"
                rounded="20px"
                overflow="hidden"
                bg="white"
                lineHeight="0"
                _hover={{ boxShadow: "dark-lg" }}
              > */}
          
          <Image
            src={`${images_url}${image}`}
            fallbackSrc="https://via.placeholder.com/150"
            alt={name}
            boxSize="200px"
            objectFit="fill"
          />
          
          {/* </WrapItem>
            </Wrap> */}
          {/* </AspectRatio> */}
        </Box>
        <Box mt={2}>
        <footer>
          <Heading size="sm">{name}</Heading>
          <Text  fontSize="22" fontWeight="bold">{formatPrice(price)}</Text>
        </footer>
        </Box>
        <Box align="center" mt={2}>
          <Button
            leftIcon={<GiShoppingCart />}
            colorScheme="teal"
            variant="solid"
            onClick={(e) => AddToCart(e)}
          >
            Add to Cart
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`;
export default Product;
