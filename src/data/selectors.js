import axios from "axios";
import { selector, useRecoilValue, useSetRecoilState } from "recoil";
import { filtersState, itemsState } from "./atomdata";
import { useItems } from "../react-query/items/useItems";

const filteredListState = selector({
  key: "filteredListState",
  get: ({ get }) => {
    const filter = get(filtersState);
    const list = get(itemsState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
