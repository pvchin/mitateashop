import { useMutation, useQueryClient } from "react-query";
import { deliveryperiod_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteDeliveryPeriod(id) {
  await fetch(deliveryperiod_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteDeliveryPeriod(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteDeliveryPeriod(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("deliveryperiod");
      toast({
        title: "Delivery Period being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
