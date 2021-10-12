import { useMutation, useQueryClient } from "react-query";
import { users_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteUser(id) {
  await fetch(users_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteUser(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast({
        title: "User being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
