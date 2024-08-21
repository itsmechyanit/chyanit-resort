import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const [sortByField, direction] = (
    searchParams.get("sortBy") ?? "startDate-desc"
  ).split("-");
  let page = searchParams.get("page") ?? 1;

  page = Number(page);
  let numPages;

  const sortByFilter = { sortByField, direction };
  let filter;
  if (!filterValue || filterValue === "all") {
    filter = null;
  } else {
    filter = { field: "status", value: filterValue, methodName: "eq" };
  }
  const {
    isPending,
    data: { data: bookings, count } = {},
    isError,
  } = useQuery({
    queryKey: ["bookings", filter, sortByFilter, page],
    queryFn: () => getBookings({ filter, sortByFilter, page }),
  });

  if (count) {
    numPages = Math.ceil(count / PAGE_SIZE);
    if (page < numPages) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortByFilter, page + 1],
        queryFn: () => getBookings({ filter, sortByFilter, page: page + 1 }),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortByFilter, page - 1],
        queryFn: () => getBookings({ filter, sortByFilter, page: page - 1 }),
      });
    }
  }
  return {
    isPending,
    bookings,
    count,
    isError,
  };
}
