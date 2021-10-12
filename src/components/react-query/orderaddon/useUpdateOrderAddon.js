import { useMutation, useQueryClient } from "react-query";
import { orderaddon_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateOrderAddon(data) {
  const { id, ...fields } = data;

  await fetch(orderaddon_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateOrderAddon(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateOrderAddon(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orderaddon");
      toast({
        title: "Order Addon being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
