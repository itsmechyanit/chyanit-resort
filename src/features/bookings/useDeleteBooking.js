import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("The booking has been successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { remove, isDeleting };
}
