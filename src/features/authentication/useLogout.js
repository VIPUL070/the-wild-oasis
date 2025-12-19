import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const querClient = useQueryClient();
  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      querClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("User successfully logged out");
    },
  });

  return { logout, isLoggingOut };
}
