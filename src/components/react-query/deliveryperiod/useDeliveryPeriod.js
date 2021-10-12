import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { deliveryperiod_url } from "../../../utils/constants";
import { filterByCategoryId } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getDeliveryPeriod(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${deliveryperiod_url}`);
  return data;
}

export function useDeliveryPeriod() {
  const [filter, setFilter] = useState("all");
  const [areaId, setAreaId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByCategoryId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: deliveryperiod = fallback } = useQuery(
    [queryKeys.deliveryperiod],
    () => getDeliveryPeriod(areaId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { deliveryperiod, filter, setFilter, setAreaId };
}
