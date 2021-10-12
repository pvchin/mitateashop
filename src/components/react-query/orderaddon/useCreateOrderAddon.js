import { useMutation, useQueryClient } from "react-query";
import { orderaddon_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addOrderAddon(data) {
  await fetch(orderaddon_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddOrderAddon(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addOrderAddon(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orderaddon");
    //   toast({
    //     title: "New Order Addon being added!",
    //     status: "success",
    //   });
    },
  });

  return mutate;
}
