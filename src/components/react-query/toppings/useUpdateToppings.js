import { useMutation, useQueryClient } from "react-query";
import { toppings_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateToppings(data) {
  const { id, ...fields } = data;

  await fetch(toppings_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateToppings(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateToppings(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("toppings");
      toast({
        title: "Topping being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
