import { useMutation, useQueryClient } from "react-query";
import { users_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addUser(data) {
  await fetch(users_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useCreateUser(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast({
        title: "New User being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
