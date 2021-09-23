import React from "react";
import styled from "styled-components";
import { AspectRatio, Box, Container, Heading } from "@chakra-ui/react";
import { PageHero } from "../components";
import aboutImg from "../assets/mitadininggroup.jpg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <AspectRatio maxW="500px" ratio={1}>
          <img src={aboutImg} alt="about" />
        </AspectRatio>
        <article>
          <Box p={6}>
            <Heading size="lg">our story</Heading>
            
          </Box>
          <Container>
            Founded in 1993, the Mita Dining Group has ten chain brands in such
            industries as Italian dining, leisure tea houses, Japanese hot pots,
            Japanese skewered food on rice, handmade bakery, and brown sugar
            beverages. It has close to 100 company-own stores in Taiwan in 2020.
            Of those stores, MITA TEA SHOP has evolved from the oldest tea
            beverage company in Taiwan and it 30 years of experience in making
            bubble black tea. Using raw materials from Taiwan Sugar Company, we
            hand stir fry every day. Using traditional methods and in low heat,
            we stir unceasingly for 1,440 times to make the sugar fragrant,
            sweet, but not greasy. We take eight steps of brewing to make pearls
            with molasses. They are sweet, fragrant, and chewy the moment they
            enter the mouth. They give a charming layered feeling. In only the
            second year of its life, MITA was invited to open stores at Eslite
            and Breeze, the former being on the CNN Travel list of the world's
            coolest department stores and the latter being a top department
            store in Taiwan. MITA has become the leading brand of brown sugar
            products in Taiwan.
          </Container>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
