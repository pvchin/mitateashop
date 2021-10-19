import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../constants";
import { carts_localstorage_key } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";
import { createLocalStorageStateHook } from "use-local-storage-state";

export function useDeleteCarts(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  const useMCarts = createLocalStorageStateHook(carts_localstorage_key, []);
  const [mcarts, setMCarts] = useMCarts();

  const { mutate } = useMutation((data) => deleteCart(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("carts");
      toast({
        title: "Carts being deleted!",
        status: "warning",
      });
    },
  });

  function deleteCart(id) {
    const data = mcarts
      .filter((r) => r.id !== id)
      .map((rec) => {
        return { ...rec };
      });
    setMCarts((prev) => (prev = [...data]));
     queryClient.invalidateQueries("carts");
  }

  return mutate;
}
