import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() { 
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user"] , user);
      toast.success("User logged in successfully");
      navigate("/dashboard");
    },

    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
