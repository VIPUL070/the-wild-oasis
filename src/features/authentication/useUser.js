import { useQuery } from "@tanstack/react-query";
import { getCurrentuser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentuser,
  });
  return {
    user,
    isLoading,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
