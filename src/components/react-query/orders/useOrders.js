import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { orders_url } from "../../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getOrders(orderId, orderNo) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${orders_url}?em=${orderId}&od=${orderNo}`);
  return data;
}

export function useOrders() {
  const [filter, setFilter] = useState("all");
  const [orderId, setOrderId] = useState("");
  const [orderNo, setOrderNo] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: orders = fallback } = useQuery(
    [queryKeys.orders, orderId, orderNo],
    () => getOrders(orderId, orderNo),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { orders, filter, setFilter, setOrderId, setOrderNo };
}
