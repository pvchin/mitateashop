import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import currency from "currency.js";
import { formatPrice } from "../utils/helpers";
import { BiCheckbox } from "react-icons/bi";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
import { images_url } from "../utils/constants";
import { useItems } from "../react-query/items/useItems";
import { useToppings } from "../react-query/toppings/useToppings";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { items, setItemId } = useItems();
  const { toppings, setToppingId } = useToppings();
  const [checkedItems, setCheckedItems] = React.useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [orderprice, setOrderPrice] = useState(0);
  const [sugarlevel, setSugarLevel] = React.useState("50");
  const [icelevel, setIceLevel] = React.useState("50");
  const [isCalc, setIsCalc] = React.useState(false);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  const Upd_Price = () => {
    let newprice = items.price;
    setOrderPrice(newprice);
  };

  useEffect(() => {
    if (items) {
      Upd_Price();
      setIsCalc(false);
    }
    // eslint-disable-next-line
  }, [isCalc]);

  useEffect(() => {
    setItemId(id);
    setIsCalc(true);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  // const {
  //   name,
  //   price,
  //   description,
  //   stock,
  //   stars,
  //   reviews,
  //   id: sku,
  //   company,
  //   images,
  // } = product;
  const { name, price, description, itemno, image } = items;
  //const id = itemno;
  const images = [image, image];

  return (
    <Wrapper>
      <VStack>
        <PageHero title={name} product />
        <Box pl={10} align="left" border="1px solid yelloe">
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
              border="1px solid blue"
            >
              <GridItem colSpan={1} align="center" border="1px solid red">
                <Box boxSize="lg" h="500px">
                  <AspectRatio maxW="md" ratio={1}>
                    <Image
                      src={`${images_url}${image}`}
                      alt={name}
                      boxSize="100%"
                      objectFit="cover"
                    />
                  </AspectRatio>
                </Box>
              </GridItem>
              <GridItem colSpan={1} border="1px solid green">
                <Box p={5} mb={50}>
                  <Heading size="md">{name}</Heading>
                  {/* <Stars stars={stars} reviews={reviews} /> */}
                  <h5 className="price">{formatPrice(price)}</h5>
                  <p className="desc"> {description}</p>
                  <HStack maxW="250px" py={2}>
                    <Heading size="sm">Quantity: </Heading>
                    <Button {...inc}>+</Button>
                    <Input {...input} fontSize="lg" textColor="red" />
                    <Button {...dec}>-</Button>
                  </HStack>
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
                          toppings.map((rec) => {
                            return (
                              <GridItem key={rec.id}>
                                <Checkbox
                                  borderColor="blue"
                                  value={rec.id}
                                  isChecked={checkedItems[0]}
                                  onChange={(e) =>
                                    setCheckedItems([
                                      e.target.checked,
                                      checkedItems[1],
                                    ])
                                  }
                                >
                                  {rec.name} {formatPrice(rec.price)}
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
                      onChange={setSugarLevel}
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
                    <Button variant="solid">
                      Add To Order {formatPrice(orderprice)}
                    </Button>
                  </Box>
                  {/* <AddToCart product={product} /> */}
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

export default SingleProductPage;
