import React from "react";
import styled from "styled-components";
import {
  Box,
  Container,
  Flex,
  Heading,
  Grid,
  AspectRatio,
  Image,
  HStack,
  Stack,
} from "@chakra-ui/react";
import logo1 from "../assets/ground.jpeg";
import logo2 from "../assets/upperfloor.jpeg";
import logo3 from "../assets/cart.jpeg";
import { services } from "../utils/constants";

const Services = () => {
  return (
    <Wrapper classname="section-center">
      <article className="header">
        <Heading>Kiulap Branch</Heading>
        {/* <p>
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates,
          ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde
          numquam nisi',
        </p> */}
      </article>
      <div className="services-center">
        <article className="service">
          <Grid
            templateColumns={{ base:"repeat(1, 1fr)", sm:"repeat(1, 1fr)", md:"repeat(3, 1fr)"}}
            gap={2}
    
          >
            <Box>
              <AspectRatio maxW="400px" ratio={4 / 3}>
                <Image src={logo1} alt="ground" boxSize="100px" />
              </AspectRatio>
            </Box>
            <Box>
              <AspectRatio maxW="400px" ratio={4 / 3}>
                <Image src={logo2} alt="upper" boxSize="100px" />
              </AspectRatio>
            </Box>
            <Box>
              <AspectRatio maxW="400px" ratio={4 / 3}>
                <Image src={logo3} alt="slogan" boxSize="100px" />
              </AspectRatio>
            </Box>
          </Grid>
        </article>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;

  background: var(--clr-primary-10);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-primary-3);
  }
  .services-center {
    margin-top: 4rem;
    margin-bottom: 4rem;

    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: var(--clr-primary-7);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    p {
      color: var(--clr-primary-2);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`;
export default Services;
