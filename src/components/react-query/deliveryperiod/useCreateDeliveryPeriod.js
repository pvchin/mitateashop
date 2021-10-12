import { useMutation, useQueryClient } from "react-query";
import { deliveryperiod_url } from "../../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addDeliveryPeriod(data) {
  await fetch(deliveryperiod_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddDeliveryPeriod(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addDeliveryPeriod(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("deliveryperiod");
      toast({
        title: "New Delivery Period being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
