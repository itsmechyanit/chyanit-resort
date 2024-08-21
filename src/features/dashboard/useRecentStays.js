import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();
  let numDays;
  numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const numDaysBeforeToday = subDays(new Date(), numDays).toISOString();
  const { data: stays, isPending: isGettingStays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(numDaysBeforeToday),
  });
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { stays, isGettingStays, confirmedStays };
}
