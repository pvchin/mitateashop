import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { formatPrice } from "../utils/helpers";
import { useHistory } from "react-router-dom";
import {
  AspectRatio,
  Box,
  Button,
  Image,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { images_url } from "../utils/constants";
import { GiShoppingCart } from "react-icons/gi";
import { useRecoilState } from "recoil";
import { orderItemState } from "../data/atomdata";

const ListView = ({ products }) => {
  const history = useHistory();
  const [orderitem, setOrderItem] = useRecoilState(orderItemState);

  const AddToCart = (e, { product } ) => {
    e.preventDefault();
    console.log("listview", product);
    const { id, image, name, price, mprice, lprice, size } = product;
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
      {products.map((product) => {
        const { id, image, name, price, description } = product;
        return (
          <article key={id}>
            <Image
              src={`${images_url}${image}`}
              alt={name}
              fallbackSrc="https://via.placeholder.com/150"
            />
            {/* <AspectRatio maxW="280px" ratio={1}>
              <Wrap px="1rem" spacing={4} justify="center">
                <WrapItem
                  boxShadow="base"
                  rounded="20px"
                  overflow="hidden"
                  bg="white"
                  lineHeight="0"
                  _hover={{ boxShadow: "dark-lg" }}
                >
                  <Image
                    src={`${images_url}${image}`}
                    alt={name}
                    boxSize="100%"
                    objectFit="cover"
                  />
                </WrapItem>
              </Wrap>
            </AspectRatio> */}
            <VStack>
              <div>
                <h4>{name}</h4>
                <h5 className="price">{formatPrice(price)}</h5>
              </div>
              {/* <p>{description.substring(0, 150)}</p> */}
              <Box align="center" mt={1}>
                <Button
                  leftIcon={<GiShoppingCart />}
                  colorScheme="teal"
                  variant="solid"
                  onClick={(e) => {
                    AddToCart(e, { product });
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </VStack>
            {/* <Link to={`/products/${id}`} className="btn">
              Details
            </Link> */}
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
