import { useMutation, useQueryClient } from "react-query";
import { users_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateUser(data) {
  const { id, ...fields } = data;

  await fetch(users_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateUser(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast({
        title: "User being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
