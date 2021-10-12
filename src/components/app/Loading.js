import React, { useState } from "react";
import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching } from "react-query";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 9999;
`;

export function Loading() {
  const isFetching = useIsFetching();
  let [color, setColor] = useState("green");

  const display = isFetching ? "inherit" : "none";

  return (
    <RingLoader color={color} loading={isFetching} css={override} size={80} />
    // <Spinner
    //   thickness="4px"
    //   speed="0.65s"
    //   emptyColor="olive.200"
    //   color="olive.800"
    //   role="status"
    //   position="fixed"
    //   zIndex="9999"
    //   top="50%"
    //   left="50%"
    //   transform="translate(-50%, -50%)"
    //   display={display}
    // >
    //   <Text display="none">Loading...</Text>
    // </Spinner>
  );
}
