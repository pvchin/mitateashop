import { useMutation, useQueryClient } from "react-query";
import { document_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addDocument(data) {
  await fetch(document_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddDocument(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addDocument(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("document");
      toast({
        title: "Document being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
