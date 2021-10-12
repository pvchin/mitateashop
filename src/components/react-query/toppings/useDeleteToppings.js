import { useMutation, useQueryClient } from "react-query";
import { toppings_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteToppings(id) {
  await fetch(toppings_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteToppings(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteToppings(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("toppings");
      toast({
        title: "Topping being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
