import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { areas_url } from "../../../utils/constants";
import { filterByCategoryId } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getArea(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${areas_url}`);
  return data;
}

export function useAreas() {
  const [filter, setFilter] = useState("all");
  const [areaId, setAreaId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByCategoryId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: areas = fallback } = useQuery(
    [queryKeys.areas],
    () => getArea(areaId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { areas, filter, setFilter, setAreaId };
}
