import { useMutation, useQueryClient } from "react-query";
import { document_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDocument(data) {
  const { id, ...fields } = data;

  await fetch(document_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDocument(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDocument(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("document");
      // toast({
      //   title: "Document being updated!",
      //   status: "success",
      // });
    },
  });

  return mutate;
}
