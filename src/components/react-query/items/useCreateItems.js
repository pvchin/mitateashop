import { useMutation, useQueryClient } from "react-query";
import { items_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addItems(data) {
  await fetch(items_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      toast({
        title: "New item being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
