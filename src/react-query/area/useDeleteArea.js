import { useMutation, useQueryClient } from "react-query";
import { areas_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteArea(id) {
  await fetch(areas_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteArea(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteArea(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("areas");
      toast({
        title: "Area being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
