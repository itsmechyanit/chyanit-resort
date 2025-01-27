/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterByField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value) {
    const page = searchParams.get("page");
    if (page) searchParams.set("page", 1);
    searchParams.set(filterByField, value);
    setSearchParams(searchParams);
  }
  const activeValue = searchParams.get(filterByField) ?? options.at(0).value;
  return (
    <StyledFilter>
      {/* <FilterButton onClick={() => handleClick("all")}>all</FilterButton>
      <FilterButton onClick={() => handleClick("no-discount")}>
        No Discount
      </FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>
        With Discount
      </FilterButton> */}
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          key={option.value}
          active={activeValue === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
