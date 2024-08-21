/* eslint-disable react/prop-types */
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
  height: 100vh;
`;

export default function RouteProvider({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isGettingUser, isAuthenticated, isError } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if ((!isAuthenticated && !isGettingUser) || isError) navigate("/login");
    },
    [isAuthenticated, isGettingUser, navigate, isError]
  );

  // 3. While loading, show a spinner
  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}
