import React from "react";
import styled from "styled-components";

const Testing = () => {
  return (
    <Wrapper>
      <h3 className="h3">hello world</h3>
      <p>hello people</p>
      <button>click me</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .h3 {
    color: blue;
  }
`;

export default Testing;
