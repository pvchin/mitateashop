import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import FeaturedProduct from "./FeaturedProduct";
import { useItems } from "../react-query/items/useItems";

const FeaturedProducts = () => {
  const { items } = useItems();
  const { featured_products: featured } = useProductsContext();

  return (
    <Wrapper className="section">
      <div className="title">
        <Heading size="md">best selling products</Heading>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {items.length > 0 &&
          items
            .filter((r) => r.featured === true)
            //.slice(0, 3)
            .map((product) => {
              return <FeaturedProduct key={product.id} {...product} />;
            })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 2rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 300px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
