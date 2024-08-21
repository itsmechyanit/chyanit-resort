import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export default function useUser() {
  const {
    isPending: isGettingUser,
    data: user,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    isGettingUser,
    user,
    isAuthenticated: user?.role === "authenticated",
    isError,
  };
}
