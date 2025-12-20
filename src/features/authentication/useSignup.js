import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCreatingAccount, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      if (user.user && user.session) {
        queryClient.setQueryData(["user"], user.user);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("Account successfully created!");
      } else {
        toast.success(
          "Please verify the account from the user's email address"
        );
      }
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create account");
    },
  });

  return { signup, isCreatingAccount };
}
