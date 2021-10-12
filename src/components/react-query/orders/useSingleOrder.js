import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { orders_url } from "../../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getSingleOrders(singleorderNo, singleorderId) {
  //const { data } = await axios.get(`${items_url}`);
 const { data } = await axios.get(`${orders_url}?em=${singleorderId}&od=${singleorderNo}`);
  return data;
}

export function useSingleOrder() {
  const [filter, setFilter] = useState("all");
  const [singleorderNo, setSingleOrderNo] = useState("");
  const [singleorderId, setSingleOrderId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: singleorder = fallback } = useQuery(
    [queryKeys.singleorder, singleorderId, singleorderNo],
    () => getSingleOrders(singleorderNo, singleorderId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { singleorder, filter, setFilter, setSingleOrderId ,setSingleOrderNo };
}
