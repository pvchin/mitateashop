import React from "react";
import styled from "styled-components";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";
import { images_url, carts_localstorage_key } from "../utils/constants";
import Example from "../components/Example"
import AdminOrdersHistory from "../components/AdminOrdersHistory"

const AdminOrderPage = () => {
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts] = useMCarts();
  
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <AdminOrdersHistory />
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

export default AdminOrderPage;
