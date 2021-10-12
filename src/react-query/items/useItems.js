import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { items_url } from "../../utils/constants";
import { filterByCategoryId } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getItems(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${items_url}?id=${id}`);
  return data;
}

export function useItems() {
  const [filter, setFilter] = useState("all");
  const [itemId, setItemId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByCategoryId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: items = fallback } = useQuery(
    [queryKeys.items, itemId],
    () => getItems(itemId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { items, filter, setFilter, setItemId };
}
