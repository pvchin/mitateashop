import React from "react";
import styled from "styled-components";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { UserOrdersHistory, PageHero } from "../components";
import { images_url } from "../utils/constants";


const OrderPage = () => {
  const useMCarts = createLocalStorageStateHook("mcarts", []);
  const [mcarts, setMCarts] = useMCarts();
  
  return (
    <main>
      <PageHero title="my orders" />
      <Wrapper className="page">
        <UserOrdersHistory />
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

export default OrderPage;
