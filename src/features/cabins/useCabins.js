import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useCabins() {
  const { isPending, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return {
    isPending,
    cabins,
  };
}
