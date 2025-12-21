import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentuser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating , mutate: updateUser } = useMutation({
    mutationFn: updateCurrentuser,

    onSuccess: (user) => {
      queryClient.setQueryData(["user"] , user.user);
      toast.success("User account successfully updated");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {isUpdating, updateUser };
}
