import { useMutation, useQueryClient } from "react-query";
import { orderitems_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateOrderItems(data) {
  const { id, ...fields } = data;

  await fetch(orderitems_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateOrderItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateOrderItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orderitems");
      toast({
        title: "Order Item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
