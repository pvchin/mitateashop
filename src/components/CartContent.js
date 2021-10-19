import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Button } from "@chakra-ui/react";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { useCartContext } from "../context/cart_context";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartsTotalItemsState } from "../data/atomdata";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { carts_localstorage_key } from "../utils/constants";
import { useCarts } from "../react-query/carts/useCarts";
import { useDeleteCarts } from "../react-query/carts/useDeleteCarts";

const CartContent = () => {
  //const { cart, clearCart } = useCartContext();
  const history = useHistory();
  const { carts } = useCarts();
  const deleteCart = useDeleteCarts();
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const [totalItems, setTotalItems] = useRecoilState(cartsTotalItemsState);
  //const [cartitems, setCartItems] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  console.log("Carts", carts);

  const Delete_Item = (id) => {
    const data = mcarts
      .filter((r) => r.id !== id)
      .map((rec) => {
        return { ...rec };
      });
    deleteCart(id);
    setTotalItems((prev) => (prev = data.length));
  };

  const Update_Item = (id, orderqty) => {
    const qty = orderqty;
    const upddata = mcarts
      .filter((r) => r.id === id)
      .map((rec) => {
        const total =
          Math.round((rec.nettprice * orderqty + Number.EPSILON) * 100) / 100;
        const data = { ...rec, qty: qty, totalprice: total };
        return { ...rec, qty: qty, totalprice: total };
      });

    const olddata = mcarts
      .filter((r) => r.id !== id)
      .map((rec) => {
        return { ...rec };
      });
    const itemdata = [...olddata, ...upddata];
    console.log(itemdata);
    setMCarts(itemdata);
  };

  const handleSaveItem = () => {
    //setMCarts(cartitems);
    history.push("/products");
  };

  // useEffect(() => {
  //   setMCarts(mcarts);
  // }, []);

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {carts &&
        carts
          .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map((item) => {
            return (
              <CartItem
                key={item.id}
                {...item}
                Delete_Item={Delete_Item}
                Update_Item={Update_Item}
              />
            );
          })}
      <hr />
      <div className="link-container">
        <button type="button" className="link-btn" onClick={handleSaveItem}>
          save and continue shopping
        </button>

        <button
          type="button"
          className="link-btn clear-btn"
          onClick={removeItem}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotals items={mcarts} />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    border: "2px solid red";
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
