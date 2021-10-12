import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { toppings_url } from "../../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getToppings(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${toppings_url}?id=${id}`);
  return data;
}

export function useToppings() {
  const [filter, setFilter] = useState("all");
  const [toppingId, setToppingId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: toppings = fallback } = useQuery(
    [queryKeys.toppings, toppingId ],
    () => getToppings(toppingId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { toppings, filter, setFilter, setToppingId };
}
