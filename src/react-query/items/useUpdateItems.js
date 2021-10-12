import { useMutation, useQueryClient } from "react-query";
import { items_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateItems(data) {
  const { id, ...fields } = data;

  await fetch(items_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      toast({
        title: "Item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
