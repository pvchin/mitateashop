import { useMutation, useQueryClient } from "react-query";
import { orderaddon_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteOrderAddon(id) {
  await fetch(orderaddon_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteOrderAddon(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteOrderAddon(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orderaddon");
      toast({
        title: "Order Addon being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
