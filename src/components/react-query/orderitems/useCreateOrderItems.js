import { useMutation, useQueryClient } from "react-query";
import { orderitems_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addOrderItems(data) {
  await fetch(orderitems_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddOrderItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addOrderItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orderitems");
      // toast({
      //   title: "New Order Item being added!",
      //   status: "success",
      // });
    },
  });

  return mutate;
}
