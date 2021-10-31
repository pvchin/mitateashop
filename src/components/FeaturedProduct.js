import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AspectRatio, Box, Container, Image } from "@chakra-ui/react";
import { images_url } from "../utils/constants";

const Product = ({ image, name, price, id }) => {
  return (
    <Wrapper>
      <Container>
        <Box boxSize="330" h="310px" marginBottom={0}>
          {/* <AspectRatio maxW="330px" ratio={1}> */}
            <Image
              src={`${images_url}${image}`}
              alt={name}
              boxSize="100%"
              objectFit="contain"
            />
          {/* </AspectRatio> */}
          <Link to={`/products/${id}`} className="link">
            <FaSearch />
          </Link>
        </Box>
        <footer>
          <h5>{name}</h5>
          <p>{formatPrice(price)}</p>
        </footer>
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
