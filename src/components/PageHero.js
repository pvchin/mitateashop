import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Heading, HStack } from "@chakra-ui/react";

const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <HStack>
          <Heading size="md">
            <Link to="/">
              Home
            </Link>
            {product && (
              <Link to="/products">
                /Products
              </Link>
            )}
            /{title}
          </Heading>
        </HStack>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 14vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
