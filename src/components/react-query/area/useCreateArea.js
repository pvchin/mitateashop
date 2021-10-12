import { useMutation, useQueryClient } from "react-query";
import { area_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addArea(data) {
  await fetch(area_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddArea(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addArea(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("area");
      toast({
        title: "New Area being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
