import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

    //SORT
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page =
    searchParams.get("page") === null ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy , page],
    queryFn: () => getBookings({ filter, sortBy , page}),
  });

  const bookings = data?.data;
  const count = data?.count;

  return { isLoading, bookings, error, count };
}
