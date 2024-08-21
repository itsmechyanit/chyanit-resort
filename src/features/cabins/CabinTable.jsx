import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get("discount") ?? "all";
  const [sortBy, direction] = searchParams.get("sortBy")?.split("-") ?? [
    "createdAt",
    "asc",
  ];

  if (isPending) return <Spinner />;
  //filtering
  let filteredCabins;
  if (filterBy === "all") filteredCabins = cabins;
  if (filterBy === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterBy === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  //sorting
  let sortedCabins;
  if (sortBy === "createdAt") {
    sortedCabins = filteredCabins;
  } else {
    let modifier = 1;
    sortedCabins =
      direction === "asc"
        ? filteredCabins.sort((a, b) => (a[sortBy] - b[sortBy]) * modifier)
        : filteredCabins.sort((a, b) => (a[sortBy] - b[sortBy]) * -modifier);
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
