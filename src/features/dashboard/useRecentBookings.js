import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();
  let numDays;
  numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const numDaysBeforeToday = subDays(new Date(), numDays).toISOString();
  const { data: bookings, isPending: isGettingBookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(numDaysBeforeToday),
  });
  return { bookings, isGettingBookings, numDays };
}
