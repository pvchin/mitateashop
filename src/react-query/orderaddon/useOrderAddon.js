import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { orderaddon_url } from "../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getOrderAddon(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${orderaddon_url}?fi=${id}`);
  return data;
}

export function useOrderAddon() {
  const [filter, setFilter] = useState("all");
  const [orderAddonId, setOrderAddonId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: orderaddon = fallback } = useQuery(
    [queryKeys.orderaddon,orderAddonId],
    () => getOrderAddon(orderAddonId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { orderaddon, filter, setFilter, setOrderAddonId };
}
