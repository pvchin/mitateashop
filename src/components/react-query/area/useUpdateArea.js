import { useMutation, useQueryClient } from "react-query";
import { area_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateArea(data) {
  const { id, ...fields } = data;

  await fetch(area_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateArea(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateArea(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("area");
      toast({
        title: "Area being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
