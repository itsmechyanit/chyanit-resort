/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function onChange(e) {
    const selectedValue = e.target.value;
    searchParams.set("sortBy", selectedValue);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={searchParams.get("sortBy")}
      onChange={onChange}
    />
  );
}
