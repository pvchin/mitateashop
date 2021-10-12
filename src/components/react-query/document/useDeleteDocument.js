import { useMutation, useQueryClient } from "react-query";
import { document_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteDocument(id) {
  await fetch(document_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteDocument(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteDocument(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("document");
      toast({
        title: "Document being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
