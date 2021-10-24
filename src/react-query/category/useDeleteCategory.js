import { useMutation, useQueryClient } from "react-query";
import { category_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteCategory(id) {
  await fetch(category_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteCategory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteCategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("category");
      toast({
        title: "Category being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
