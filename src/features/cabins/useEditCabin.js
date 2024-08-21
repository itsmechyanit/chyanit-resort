import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin(cabinEditId) {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditingCabin } = useMutation({
    mutationFn: (data) => createEditCabin(data, cabinEditId),
    onSuccess: () => {
      toast.success("Cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { editCabin, isEditingCabin };
}
