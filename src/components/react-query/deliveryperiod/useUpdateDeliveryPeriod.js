import { useMutation, useQueryClient } from "react-query";
import { deliveryperiod_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDeliveryPeriod(data) {
  const { id, ...fields } = data;

  await fetch(deliveryperiod_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDeliveryPeriod(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDeliveryPeriod(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("deliveryperiod");
      toast({
        title: "Delivery Period being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
