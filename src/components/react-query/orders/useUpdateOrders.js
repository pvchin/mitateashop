import { useMutation, useQueryClient } from "react-query";
import { orders_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateOrders(data) {
  const { id, ...fields } = data;
  
  await fetch(orders_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateOrders(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateOrders(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    //   toast({
    //     title: "Order being updated!",
    //     status: "success",
    //   });
    },
  });

  return mutate;
}
