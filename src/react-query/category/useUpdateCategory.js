import { useMutation, useQueryClient } from "react-query";
import { category_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateCategory(data) {
  const { id, ...fields } = data;

  await fetch(category_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateCategory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateCategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("category");
      toast({
        title: "Category being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
