import { useMutation, useQueryClient } from "react-query";
import { items_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addToppings(data) {
  await fetch(items_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddToppings(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addToppings(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("toppings");
      toast({
        title: "New topping being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
