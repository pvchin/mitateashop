import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { orders_url } from "../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getOrders(batchId) {
  const { data } = await axios.get(`${orders_url}?st=${batchId}`);
  return data;
}

export function useBatchOrders() {
  const [filter, setFilter] = useState("all");
  const [batchId, setBatchId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: batchorders = fallback } = useQuery(
    [queryKeys.batchorders, batchId],
    () => getOrders(batchId),
    {
      select: filter !== "all" ? selectFn : undefined,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { batchorders, filter, setFilter, setBatchId };
}
