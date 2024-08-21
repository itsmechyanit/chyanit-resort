import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdatingUser };
}
