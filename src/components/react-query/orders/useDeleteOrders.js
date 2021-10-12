import { useMutation, useQueryClient } from "react-query";
import { orders_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteOrders(id) {
  await fetch(orders_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteOrders(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteOrders(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast({
        title: "Order being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
