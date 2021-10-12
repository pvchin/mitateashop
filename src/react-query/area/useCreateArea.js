import { useMutation, useQueryClient } from "react-query";
import { areas_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addArea(data) {
  await fetch(areas_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddArea(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addArea(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("areas");
      toast({
        title: "New Area being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
