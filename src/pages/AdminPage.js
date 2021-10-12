import React from "react";
import styled from "styled-components";
import { Container, Box, Flex } from "@chakra-ui/react";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";
import AdminMain from "../components/AdminMain";

const AdminPage = () => {
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <AdminMain />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default AdminPage;
