import { useMutation, useQueryClient } from "react-query";
import { orderitems_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteOrderItems(id) {
  await fetch(orderitems_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteOrderItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteOrderItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orderitems");
      toast({
        title: "Order Item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
