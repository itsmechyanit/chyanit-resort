import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBooking() {
  const { bookingId } = useParams();
  const { isPending, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return {
    isPending,
    booking,
  };
}
