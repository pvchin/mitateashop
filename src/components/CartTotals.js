import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { createLocalStorageStateHook } from "use-local-storage-state";
import { useRecoilState } from "recoil";
import { orderState } from "./data/atomdata";
import { currentorderState } from "./data/atomdata";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { carts_localstorage_key } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import { useHistory } from "react-router-dom";
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useDocument } from "./react-query/document/useDocument";
import { useUpdateDocument } from "./react-query/document/useUpdateDocument";
import { useOrders } from "./react-query/orders/useOrders";
import { useAddOrders } from "./react-query/orders/useCreateOrders";
import { useOrderItems } from "./react-query/orderitems/useOrderItems";
import { useAddOrderItems } from "./react-query/orderitems/useCreateOrderItems";
import { useOrderAddon } from "./react-query/orderaddon/useOrderAddon";
import { useAddOrderAddon } from "./react-query/orderaddon/useCreateOrderAddon";
import { useAuthUser } from "./react-query/auth/useAuthUser";
import { useUsers } from "./react-query/users/useUsers";

const initial_authuser = [
  {
    email: "",
    name: "",
  },
];

const CartTotals = ({ items }) => {
  const history = useHistory();
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const { document } = useDocument();
  const { authuser } = useAuthUser();
  const { orders, setOrderId } = useOrders();
  const { orderitems } = useOrderItems();
  const { orderaddon } = useOrderAddon();
  const addOrders = useAddOrders();
  const addOrderItems = useAddOrderItems();
  const addOrderAddon = useAddOrderAddon();
  const updateDocument = useUpdateDocument();
  const [totalamount, setTotalAmount] = useState(0);
  const [shippingfee, setShippingFee] = useState(0);
  const [order, setOrder] = useRecoilState(orderState);
  const [currentorder, setCurrentOrder] = useRecoilState(currentorderState);
  const { users, setUserId } = useUsers();
  //const { email, name } = authuser ? authuser[0] : initial_authuser;
  //const { total_amount, shipping_fee } = useCartContext();
  //const { myUser, loginWithRedirect } = useUserContext();

  useEffect(() => {
    setOrderId(authuser[0].email);
  });

  useEffect(() => {
    if (items) {
      handleCalc();
    }
  }, [items]);

  useEffect(() => {
    setUserId(authuser ? authuser[0].token : "");
  }, [authuser]);

  const handleCalc = () => {
    const totamount = items.reduce((acc, rec) => {
      return acc + Math.round((rec.totalprice + Number.EPSILON) * 100) / 100;
    }, 0);
    setTotalAmount(totamount);
  };

  const handleLogin = () => {
    history.push("/signin");
  };

  const handleCheckOut = () => {
    // generate new order no

    const newOrderNo = parseFloat(document[0].orderno) + 1;
    const orderdata = {
      ...order,
      orderno: newOrderNo.toString(),
      email: authuser ? authuser[0].email : "",
      custname: users.length > 0 ? users[0].name : "",
      phone: users.length > 0 ? users[0].phone : "",
      address1: users.length > 0 ? users[0].address1 : "",
      address2: users.length > 0 ? users[0].address2 : "",
      grossamount: totalamount,
      deliveryfee: 0,
      nettamount: totalamount,
      deliverymode: "pickup",
      paymentmode: "bank",
      area: users.length > 0 ? users[0].area : "",
      requestdate: dayjs().format("YYYY-MM-DD"),
      //requesttime: "",
      status: "Pending",
    };
    setOrder(orderdata);
    updateDocument({ id: document[0].id, orderno: newOrderNo.toString() });

    //save current orderno
    setCurrentOrder({
      ...currentorder,
      deliverymode: "pickup",
      area: users.length > 0 ? users[0].area : "",
      currentorderno: newOrderNo.toString(),
      grossamount: totalamount,
      nettamount: totalamount,
      deliveryfee: 0,
    });

    // save order header
    addOrders({
      orderno: newOrderNo.toString(),
      email: authuser ? authuser[0].email : "",
      custname: users[0].name,
      phone: users[0].phone,
      address1: users[0].address1,
      address2: users[0].address2,
      grossamount: totalamount,
      deliveryfee: 0,
      nettamount: totalamount,
      deliverymode: "pickup",
      paymentmode: "bank",
      area: "",
      status: "Pending",
    });

    mcarts &&
      mcarts.forEach((rec) => {
        const { addon } = rec;
        const toppings = addon;

        addOrderItems({
          orderno: newOrderNo.toString(),
          orderitemid: rec.id,
          itemid: rec.itemid,
          name: rec.name,
          price: rec.price,
          nettprice: rec.nettprice,
          qty: rec.qty,
          image: rec.image,
          totalprice: rec.totalprice,
          sugarlevel: rec.sugarlevel,
          icelevel: rec.icelevel,
          mprice: rec.mprice,
          lprice: rec.lprice,
          size: rec.size,
        });

        toppings
          .filter((r) => r.checked === true)
          .forEach((item) => {
            addOrderAddon({
              orderno: newOrderNo.toString(),
              orderitemid: rec.id,
              name: item.name,
              description: item.description,
              price: item.price,
              checked: item.checked,
            });
          });
      });

    history.push("/checkout");
  };

  return (
    <Flex mt={5}>
      <SimpleGrid
        templateColumns={{
          base: "repeat(1, 1fr)", // 0-48em
          md: "repeat(2, 1fr)", // 48em-80em,
          xl: "repeat(3, 1fr)", // 80em+
        }}
        gap={6}
      >
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem border="1px solid blue.200">
          <Box h={200} mt={5}>
            <Grid templateColumns="repeat(2,1fr)">
              <GridItem>
                <Heading as="h5" size="sm" ml={10}>
                  subtotal :
                </Heading>
              </GridItem>
              <GridItem>
                <Heading as="h5" size="sm" ml={10}>
                  {formatPrice(totalamount)}
                </Heading>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2,1fr)">
              <GridItem>
                <Text as="h5" size="sm" mt={2} ml={10}>
                  shipping fee :
                </Text>
              </GridItem>
              <GridItem>
                <Text as="h5" size="sm" mt={2} ml={10}>
                  {formatPrice(shippingfee)}
                </Text>
              </GridItem>
            </Grid>
            <Divider borderColor="blue.200" border="2px" my={8} />
            <Heading as="h4" size="md" mt={10} align="center">
              order total :{" "}
              <span>{formatPrice(totalamount + shippingfee)}</span>
            </Heading>
          </Box>
          <Box align="center">
            {authuser && authuser.length > 0 ? (
              <button type="button" className="btn" onClick={handleCheckOut}>
                proceed to checkout
              </button>
            ) : (
              <button type="button" className="btn" onClick={handleLogin}>
                login
              </button>
            )}
          </Box>
        </GridItem>
      </SimpleGrid>

      {/* <div>
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
      </div> */}
    </Flex>
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
