import { useMutation, useQueryClient } from "react-query";
import { area_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteArea(id) {
  await fetch(area_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteArea(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteArea(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("area");
      toast({
        title: "Area being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
