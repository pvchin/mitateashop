import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../constants";
import { carts_localstorage_key } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";
import { createLocalStorageStateHook } from "use-local-storage-state";

export function useAddCarts(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts] = useMCarts();

  const { mutate } = useMutation((data) => createCart(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("carts");
      toast({
        title: "Carts being created!",
        status: "success",
      });
    },
  });

  function createCart(data) {
    const newdata = [...mcarts, data];
    console.log("add", mcarts);
    console.log("add1", newdata);
    setMCarts([...mcarts, data]);
    //queryClient.invalidateQueries("carts");
  }

  return mutate;
}
