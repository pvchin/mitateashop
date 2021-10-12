import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { users_url } from "../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getUsers(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${users_url}?tk=${id}`);
  return data;
}

export function useUsers() {
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: users = fallback } = useQuery(
    [queryKeys.users, userId],
    () => getUsers(userId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { users, filter, setFilter, setUserId };
}
