import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import currency from "currency.js";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { orderItemState } from "../data/atomdata";
import { cartsTotalItemsState } from "../data/atomdata";
import { formatPrice } from "../utils/helpers";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { createLocalStorageStateHook } from "use-local-storage-state";
import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  VStack,
  useNumberInput,
} from "@chakra-ui/react";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { images_url, carts_localstorage_key } from "../utils/constants";
import { useToppings } from "../react-query/toppings/useToppings";
import { useOrderItems } from "../react-query/orderitems/useOrderItems";
import { useAddOrderItems } from "../react-query/orderitems/useCreateOrderItems";
import { useDeleteItems } from "../react-query/items/useDeleteItems";
import { useUpdateItems } from "../react-query/items/useUpdateItems";
import { useCarts } from "../react-query/carts/useCarts";
import { useAddCarts } from "../react-query/carts/useCreateCarts";

const SingleProduct = () => {
  //const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  //const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  //const [mcarts, setMCarts] = useMCarts();
  const [totalItems, setTotalItems] = useRecoilState(cartsTotalItemsState);
  const { carts, updateCarts } = useCarts();
  const addCart = useAddCarts();
  const { toppings, setToppingId } = useToppings();
  const { orderitems, setOrderItemId } = useOrderItems();
  const addOrderItems = useAddOrderItems();
  const updateOrderItems = useUpdateItems();
  const deleteOrderItem = useDeleteItems();
  const [checkedItems, setCheckedItems] = React.useState([]);
  const [orderitem, setOrderItem] = useRecoilState(orderItemState);
  const [orderprice, setOrderPrice] = useState(0);
  const [sugarlevel, setSugarLevel] = React.useState("50");
  const [icelevel, setIceLevel] = React.useState("50");
  const [isCalc, setIsCalc] = React.useState(true);
  const [isSizePrice, setIsSizePrice] = React.useState(0);
  const [sizeType, setSizeType] = React.useState("");
  const [isLoad, setIsLoad] = React.useState(true);
  console.log("sizetype", sizeType)

  const { name, price, mprice, lprice, description, image, size, id } =
    orderitem;


  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
      name: "qty",
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  const handleCalc = () => {
    //calc
    var nprice =
      size === "M"
        ? parseFloat(orderitem.mprice)
        : parseFloat(orderitem.lprice);
    var qty = parseInt(input.value);

    checkedItems.forEach((rec) => {
      if (rec.checked) {
        nprice = nprice + rec.price;
      }
    });
    const newTotal = Math.round((nprice * qty + Number.EPSILON) * 100) / 100;

    setOrderItem(() => ({
      ...orderitem,
      qty: qty,
      size: sizeType,
      price: price,
      nettprice: nprice,
      totalprice: newTotal,
      icelevel: icelevel,
      sugarlevel: sugarlevel,
      addon: checkedItems,
    }));

    console.log("orderitem", orderitem);
  };

  const Update_OrderItem = () => {
    const newrec = { ...orderitem, size: sizeType, sugarlevel: sugarlevel, icelevel: icelevel }
    const newdata = [...carts, newrec];
    //addCart(orderitem);
    //setMCarts(newdata);
    //queryClient.invalidateQueries("carts");
    console.log("update orderitems", newdata)
    updateCarts(newdata)
    setTotalItems((prev) => (prev = newdata.length));
  };

  const handleSizeBox = (e) => {
    setOrderItem({
      ...orderitem,
      size: e,
    });
    setIsCalc(true);
  };

  const handleCheckBox = (e) => {
    const toppingIndex = toppings.findIndex(
      (obj) => obj.name === e.target.name
    );
    const { name, description, price } = toppings[toppingIndex];
    const newdata = { name, description, price, checked: e.target.checked };

    const objIndex = checkedItems.findIndex(
      (obj) => obj.name === e.target.name
    );

    if (objIndex === -1) {
      setCheckedItems([...checkedItems, newdata]);
    } else {
      const olddata = checkedItems
        .filter((r) => r.name !== e.target.name)
        .map((rec) => {
          return { ...rec };
        });
      setCheckedItems([...olddata, newdata]);
    }

    setIsCalc(true);
  };

  const handleButtonSubmit = (e) => {
    e.preventDefault();

    Update_OrderItem();
    history.push("/cart");
    //console.log("orderitemstotal", sugarlevel, icelevel, orderitem);
  };

  useEffect(() => {
    handleCalc();
    // eslint-disable-next-line
  }, [input.value]);

  useEffect(() => {
    handleCalc();
    // eslint-disable-next-line
  }, [sugarlevel]);

  useEffect(() => {
    handleCalc();
    setIsCalc(false);
    // eslint-disable-next-line
  }, [isCalc]);

  useEffect(() => {
    if (orderitem) {
      setSizeType(orderitem.size);
      setIsLoad(false);
    }
    // eslint-disable-next-line
  }, [isLoad]);

  //   useEffect(() => {
  //     console.log("isload", toppings);
  //     if (toppings && toppings.length === 6) {
  //         toppings.forEach((rec) => {
  //           const newdata = {...rec, checked:false}
  //           setCheckedItems([...checkedItems, newdata])
  //       })
  //       //setIsLoad(false);
  //     }
  //     // eslint-disable-next-line
  //   }, [toppings]);

  //   useEffect(() => {
  //     if (error) {
  //       setTimeout(() => {
  //         history.push("/");
  //       }, 3000);
  //     }
  //     // eslint-disable-next-line
  //   }, [error]);

  return (
    <Wrapper>
      <VStack>
        <PageHero title={name} product />
        <Box pl={10} align="left">
          <Link to="/products" className="btn">
            back to products
          </Link>
        </Box>
        <Box>
          <HStack align="center">
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap={2}
              //border="1px solid blue"
            >
              <GridItem colSpan={1} align="center">
                {/* <Box boxSize="lg" h="500px"> */}
                {/* <AspectRatio maxW="md" ratio={1}> */}
                <Image
                  src={`${images_url}${image}`}
                  fallbackSrc="https://via.placeholder.com/250"
                  alt={name}
                  boxSize="500px"
                  objectFit="contain"
                />
                {/* </AspectRatio> */}
                {/* </Box> */}
              </GridItem>
              <GridItem colSpan={1} bg="gray.100">
                <Box p={5} mb={50}>
                  <Heading size="md">{name}</Heading>
                  {/* <Stars stars={stars} reviews={reviews} /> */}
                  <h5 className="price">{formatPrice(price)}</h5>
                  <p className="desc"> {description}</p>
                  <HStack maxW="250px" py={2}>
                    <Heading size="sm">Quantity: </Heading>
                    <Button {...inc}>
                      <AiOutlinePlus size={200} />
                    </Button>
                    <Input {...input} fontSize="lg" textColor="red" />
                    <Button {...dec}>
                      <AiOutlineMinus size={200} />
                    </Button>
                  </HStack>
                  <Box>
                    <Heading size="sm">What is your prefer size? </Heading>
                  </Box>
                  <Box backgroundColor="olive.50" p={1}>
                    <RadioGroup
                      borderColor="blue"
                      onChange={(e) => {
                        setTimeout(() => {
                          setSizeType(e);
                          handleSizeBox(e);
                        }, 1000);
                        //setIsCalc(true);
                      }}
                      value={sizeType}
                    >
                      <Grid
                        templateColumns={{
                          base: "repeat(2, 1fr)",
                          sm: "repeat(2, 1fr)",
                          md: "repeat(2, 1fr)",
                        }}
                      >
                        <GridItem>
                          <Radio
                            borderColor="blue"
                            value="M"
                            isDisabled={mprice > 0 ? false : true}
                          >
                            Size M {mprice > 0 ? formatPrice(mprice) : ""}
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="L">
                            Size L {formatPrice(lprice)}
                          </Radio>
                        </GridItem>
                      </Grid>
                    </RadioGroup>
                  </Box>
                  <Box py={2}>
                    <Heading size="sm">Would you like toppings? </Heading>
                  </Box>
                  <Box backgroundColor="olive.50" p={1}>
                    <CheckboxGroup
                      colorScheme="blue"
                      //defaultValue={["naruto", "kakashi"]}
                    >
                      <Grid
                        templateColumns={{
                          base: "repeat(2, 1fr)",
                          sm: "repeat(2, 1fr)",
                          md: "repeat(2, 1fr)",
                        }}
                      >
                        {toppings &&
                          toppings.map((rec, index) => {
                            return (
                              <GridItem key={rec.id}>
                                <Checkbox
                                  borderColor="blue"
                                  name={rec.name}
                                  value={rec.id}
                                  isChecked={checkedItems[index]}
                                  onChange={(e) => handleCheckBox(e)}
                                >
                                  {rec.description} {formatPrice(rec.price)}
                                </Checkbox>
                              </GridItem>
                            );
                          })}
                      </Grid>
                    </CheckboxGroup>
                  </Box>
                  <Box py={2}>
                    <Heading size="sm">What is your Sugar level? </Heading>
                  </Box>
                  <Box backgroundColor="olive.50" p={1}>
                    <RadioGroup
                      borderColor="blue"
                      onChange={(e) => {
                        setTimeout(() => {
                          setSugarLevel(e);
                        }, 1000);
                        //setIsCalc(true);
                      }}
                      value={sugarlevel}
                    >
                      <Grid
                        templateColumns={{
                          base: "repeat(3, 1fr)",
                          sm: "repeat(3, 1fr)",
                          md: "repeat(3, 1fr)",
                        }}
                      >
                        <GridItem>
                          <Radio borderColor="blue" value="0">
                            0%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="25">
                            25%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="50">
                            50%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="75">
                            75%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="100">
                            100%
                          </Radio>
                        </GridItem>
                      </Grid>
                    </RadioGroup>
                  </Box>
                  <Box py={2}>
                    <Heading size="sm">What is your Ice level? </Heading>
                  </Box>
                  <Box backgroundColor="olive.50" p={1}>
                    <RadioGroup onChange={setIceLevel} value={icelevel}>
                      <Grid
                        templateColumns={{
                          base: "repeat(3, 1fr)",
                          sm: "repeat(3, 1fr)",
                          md: "repeat(3, 1fr)",
                        }}
                      >
                        <GridItem>
                          <Radio borderColor="blue" value="0">
                            0%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="25">
                            25%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="50">
                            50%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="75">
                            75%
                          </Radio>
                        </GridItem>
                        <GridItem>
                          <Radio borderColor="blue" value="100">
                            100%
                          </Radio>
                        </GridItem>
                      </Grid>
                    </RadioGroup>
                  </Box>

                  <hr />
                  <Box py={50}>
                    <Button
                      variant="solid"
                      border="1px solid green"
                      borderRadius="10"
                      color="green"
                      bg="green.50"
                      onClick={(e) => handleButtonSubmit(e)}
                    >
                      Add To Order {formatPrice(orderitem.totalprice)} (
                      {formatPrice(orderitem.nettprice)} x {orderitem.qty})
                    </Button>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </HStack>
        </Box>
      </VStack>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProduct;
