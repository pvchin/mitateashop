import { useMutation, useQueryClient } from "react-query";
import { orders_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addOrders(data) {
  await fetch(orders_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddOrders(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addOrders(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    //   toast({
    //     title: "New Order being added!",
    //     status: "success",
    //   });
    },
  });

  return mutate;
}
