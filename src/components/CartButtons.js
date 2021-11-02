import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { createLocalStorageStateHook } from "use-local-storage-state";
import styled from "styled-components";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { cartsTotalItemsState } from "../data/atomdata";
import { carts_localstorage_key } from "../utils/constants";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { useCarts } from "../react-query/carts/useCarts";
import { useAuthUser } from "../react-query/auth/useAuthUser";
import { useUsers } from "../react-query/users/useUsers";
import Signin from "./Signin";

const CartButtons = () => {
  const history = useHistory();
  //const { carts } = useCarts();
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const { authuser, updateAuthUser, clearAuthUser } = useAuthUser();
  const { users, setUserId } = useUsers();
  const { closeSidebar } = useProductsContext();
  const { total_items } = useCartContext();
  //const { loginWithRedirect, myUser, logout } = useUserContext();
  const [totalitems, setTotalItems] = useRecoilState(cartsTotalItemsState);
  const [isLoad, setIsLoad] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("totalitems", totalitems);
  //console.log("authuser", authuser ? authuser : "none");
  //console.log("authuser length", authuser ? authuser.length : 0);

  useEffect(() => {
    if (mcarts) {
      setTotalItems(mcarts.length);
      setIsLoad(false);
    }
  }, [isLoad]);

  useEffect(() => {
    if (authuser && authuser.length > 0) {
      setUserId(authuser[0].email);
    }
  }, [authuser]);

  const handleSignin = () => {
    closeSidebar();
    history.push("/signin");
  };

  const handleLogOut = () => {
    closeSidebar();
    clearAuthUser();
    history.push("/");
    window.location.reload();
  };

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{totalitems}</span>
        </span>
      </Link>
      {authuser && authuser.length > 0 ? (
        <button type="button" className="auth-btn" onClick={handleLogOut}>
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={handleSignin}>
          Login <FaUserPlus />
        </button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box align="center">
              <Text fontFamily="cursive" fontSize="25">
                Sign In
              </Text>
            </Box>
          </ModalHeader>
          <Divider borderColor="blue" border="1px" />
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%">
              <Signin />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
