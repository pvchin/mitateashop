import React, { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { items_url, carts_localstorage_key } from "../../utils/constants";
import { filterByItemId } from "./utils";
import { createLocalStorageStateHook } from "use-local-storage-state";

import axios from "axios";
import { queryKeys } from "../constants";

export function useCarts() {
  const [filter, setFilter] = useState("all");
  const [itemId, setItemId] = useState("");
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts, { removeItem }] = useMCarts();
  const queryClient = useQueryClient();
  
  const selectFn = useCallback(
    (unfiltered) => filterByItemId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: carts = fallback } = useQuery(
    [queryKeys.carts],
    () => getCarts(),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  function getCarts() {
    const data = mcarts ? mcarts : [];
    return data;
  }

  function updateCarts(data) {
    
    setMCarts(data);
    queryClient.setQueryData(queryKeys.carts, data);
    //queryClient.invalidateQueries("users");
  }

  function clearCarts() {
    removeItem();
  }

  return { carts, filter, setFilter, setItemId, updateCarts, clearCarts };
}
