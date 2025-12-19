import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabinData) => createEditCabin(newCabinData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("New cabin successfully create");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating , createCabin } ;
}
