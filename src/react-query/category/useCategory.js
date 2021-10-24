import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { category_url } from "../../utils/constants";
import { filterByCategoryId } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getCategory(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${category_url}`);
  return data;
}

export function useCategory() {
  const [filter, setFilter] = useState("all");
  const [categoryId, setCategoryId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByCategoryId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: category = fallback } = useQuery(
    [queryKeys.category],
    () => getCategory(categoryId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { category, filter, setFilter, setCategoryId };
}
