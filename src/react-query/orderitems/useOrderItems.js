import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { orderitems_url } from "../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getOrderItems(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${orderitems_url}?fi=${id}`);
  return data;
}

export function useOrderItems() {
  const [filter, setFilter] = useState("all");
  const [orderitemId, setOrderItemId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: orderitems = fallback } = useQuery(
    [queryKeys.orderitems,  orderitemId ],
    () => getOrderItems(orderitemId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { orderitems, filter, setFilter, setOrderItemId };
}
