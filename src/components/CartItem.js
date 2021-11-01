import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createLocalStorageStateHook } from "use-local-storage-state";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Text,
} from "@chakra-ui/react";
import { carts_localstorage_key } from "../utils/constants";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { formatPrice } from "../utils/helpers";
import AmountButtons from "./AmountButtons";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useCartContext } from "../context/cart_context";
import { images_url } from "../utils/constants";

const CartItem = ({
  id,
  image,
  name,
  qty,
  price,
  size,
  nettprice,
  totalprice,
  sugarlevel,
  icelevel,
  addon,
  Delete_Item,
  Update_Item,
}) => {
  // const { removeItem, toggleAmount } = useCartContext();
  // const increase = () => {
  //   toggleAmount(id, "inc");
  // };
  // const decrease = () => {
  //   toggleAmount(id, "dec");
  // };
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
      name: "qty",
      value: qty,
    });
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const [orderqty, setOrderQty] = useState(qty);
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleQtyChange = (e) => {
    setOrderQty(e);
    const orderqty = parseInt(e);
    Update_Item(id, orderqty);
  };

  const handleRemove = (e) => {
    handleAlertOpen();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    console.log("ondelee", id);
    Delete_Item(id);
  };
  return (
    <Wrapper>
      <div className="title">
        <Box>
          <AspectRatio>
            <img src={`${images_url}${image}`} alt={name} />
          </AspectRatio>
        </Box>
        <div>
          <Text
            size={{
              base: "sm", // 0-48em
              md: "sm", // 48em-80em,
              xl: "md", // 80em+
            }}
            fontWeight="bold"
          >
            {name}
          </Text>
          <Heading className="color">Size: {size}</Heading>
          {addon &&
            addon
              .filter((r) => r.checked === true)
              .map((rec) => {
                return (
                  <Text
                    fontSize={{
                      base: "12px", // 0-48em
                      md: "12px", // 48em-80em,
                      xl: "14px", // 80em+
                    }}
                  >
                    {rec.description}
                  </Text>
                );
              })}
          <Text
            fontSize={{
              base: "12px", // 0-48em
              md: "12px", // 48em-80em,
              xl: "14px", // 80em+
            }}
          >
            Ice: {icelevel}% Sugar: {sugarlevel}%
          </Text>
          <h5 className="price-small">{formatPrice(nettprice)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(nettprice)}</h5>
      {/* <AmountButtons amount={totalprice} increase={increase} decrease={decrease} /> */}
      {/* <h5 className="subtotal">{qty}</h5> */}
      <Box p={5} mb={50}>
        <HStack maxW="80px" py={2} mt="50">
          {/* <Button {...inc}>+</Button>
          <Input {...input} fontSize="1.3rem" textColor="red" />
          <Button {...dec}>-</Button> */}
          <NumberInput
            size={{ base: "sm", md: "3xl" }}
            name="itemqty"
            value={orderqty}
            onChange={(e) => handleQtyChange(e)}
            min={1}
            max={100}
          >
            <NumberInputField fontSize={{base: "auto", md: "3xl"}} name="itemqty" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </Box>
      <h5 className="subtotal">{formatPrice(totalprice)}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={() => handleRemove(id)}
      >
        <FaTrash />
      </button>
      <AlertDialogBox
        onClose={handleAlertClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertOpen}
        title="Delete Item"
      >
        <h2>Are you sure you want to delete ?</h2>
      </AlertDialogBox>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    height: 100%;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default CartItem;
