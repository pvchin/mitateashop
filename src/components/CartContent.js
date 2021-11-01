import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Button, Divider } from "@chakra-ui/react";
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
import { AlertDialogBox } from "../helpers/AlertDialogBox";

const CartContent = () => {
  //const { cart, clearCart } = useCartContext();
  const history = useHistory();
  const { carts, updateCarts, clearCarts } = useCarts();

  //const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  //const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const [totalItems, setTotalItems] = useRecoilState(cartsTotalItemsState);
  //const [cartitems, setCartItems] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const Delete_Item = (id) => {
    const data = carts
      .filter((r) => r.id !== id)
      .map((rec) => {
        return { ...rec };
      });
    //deleteCart(id);
    updateCarts(data);
    setTotalItems((prev) => (prev = data.length));
  };

  const Update_Item = (id, orderqty) => {
    const qty = orderqty;
    const upddata = carts
      .filter((r) => r.id === id)
      .map((rec) => {
        const total =
          Math.round((rec.nettprice * orderqty + Number.EPSILON) * 100) / 100;
        const data = { ...rec, qty: qty, totalprice: total };
        return { ...rec, qty: qty, totalprice: total };
      });

    const olddata = carts
      .filter((r) => r.id !== id)
      .map((rec) => {
        return { ...rec };
      });
    const itemdata = [...olddata, ...upddata];
    console.log(itemdata);
    updateCarts(itemdata);
  };

  const handleSaveItem = () => {
    //setMCarts(cartitems);
    history.push("/products");
  };

  const handleClearItem = () => {
    handleAlertOpen();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    clearCarts();
    window.location.reload();
  };
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
      {/* <hr /> */}
      <Divider pt={1}  borderColor="blue.200"/>
      <div className="link-container">
        <button type="button" className="link-btn" onClick={handleSaveItem}>
          save and continue shopping
        </button>

        <button
          type="button"
          className="link-btn clear-btn"
          onClick={handleClearItem}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotals items={carts} />
      <AlertDialogBox
        onClose={handleAlertClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertOpen}
        title="Delete Item"
      >
        <h2>Are you sure you want to clear your cart? ?</h2>
      </AlertDialogBox>
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
