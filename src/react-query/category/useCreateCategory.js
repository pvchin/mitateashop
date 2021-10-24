import { useMutation, useQueryClient } from "react-query";
import { category_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addCategory(data) {
  await fetch(category_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddCategory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addCategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("category");
      toast({
        title: "New Category being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
