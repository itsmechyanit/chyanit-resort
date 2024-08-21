import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterByField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "sort by name[A-Z]" },
          { value: "name-desc", label: "sort by name[Z-A]" },
          {
            value: "regularPrice-asc",
            label: "sort by price[Low-High]",
          },
          {
            value: "regularPrice-desc",
            label: "sort by price[High-Low]",
          },
          {
            value: "maxCapacity-asc",
            label: "sort by capacity[Low-High]",
          },
          {
            value: "maxCapacity-desc",
            label: "sort by capacity[High-low]",
          },
          {
            value: "discount-asc",
            label: "sort by discount[Low-High]",
          },
          {
            value: "discount-desc",
            label: "sort by discount[High-Low]",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperations;
