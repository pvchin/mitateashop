import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";

const CartTotals = ({ items }) => {
  const useMCarts = createLocalStorageStateHook("mcarts", []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const [totalamount, setTotalAmount] = useState(0);
  const [shippingfee, setShippingFee] = useState(0);
  //const { total_amount, shipping_fee } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();

  const handleCalc = () => {
    const totamount = items.reduce((acc, rec) => {
      return acc + Math.round((rec.totalprice + Number.EPSILON) * 100) / 100;
    }, 0);
    setTotalAmount(totamount);
  };

  useEffect(() => {
    if (items) {
      handleCalc();
    }
  }, [items]);

  return (
    <Wrapper>
      <div>
        
        <article>
          <Heading as="h5" size="sm">
            subtotal : <span>{formatPrice(totalamount)}</span>
          </Heading>
          <Heading as="h5" size="sm">
            shipping fee : <span>{formatPrice(shippingfee)}</span>
          </Heading>
          <hr />
          <Heading as="h4" size="md">
            order total : <span>{formatPrice(totalamount + shippingfee)}</span>
          </Heading>
        </article>
        {myUser ? (
          <Link to="/checkout" className="btn">
            proceed to checkout
          </Link>
        ) : (
          <button type="button" className="btn" onClick={loginWithRedirect}>
            login
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
