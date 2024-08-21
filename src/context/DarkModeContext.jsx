/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDark");
  function toggleDarkMode() {
    setIsDarkMode((dark) => !dark);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDark() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "Context value is used in the wrong component. Please make sure to wrap your component in DarkModeProvider component"
    );
  }
  return context;
}
