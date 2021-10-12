import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { document_url } from "../../utils/constants";
import { filterByCategoryId } from "./utils";

import axios from "axios";
import { queryKeys } from "../constants";

async function getDocument(id) {
  //const { data } = await axios.get(`${items_url}`);
  const { data } = await axios.get(`${document_url}?id=${id}`);
  return data;
}

export function useDocument() {
  const [filter, setFilter] = useState("all");
  const [docId, setDocId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByCategoryId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: document = fallback } = useQuery(
    [queryKeys.document, docId],
    () => getDocument(docId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { document, filter, setFilter, setDocId };
}
