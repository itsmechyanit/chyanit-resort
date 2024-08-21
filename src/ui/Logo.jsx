// import styled from "styled-components";
// import { useDark } from "../context/DarkModeContext";

// const StyledLogo = styled.div`
//   text-align: center;
// `;

// const Img = styled.img`
//   height: 9.6rem;
//   width: auto;
// `;

// function Logo() {
//   const { isDarkMode } = useDark();
//   const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
//   return (
//     <StyledLogo>
//       <Img src={src} alt="Logo" />
//     </StyledLogo>
//   );
// }

// export default Logo;

import styled, { css } from "styled-components";
import { useDark } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
  & p {
    ${(props) =>
      props.isDarkMode
        ? css`
            color: "#fff";
          `
        : css`
            color: "#18212f";
          `}
    margin-top:1rem;
    font-weight: 500;
  }
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDark();
  const src = "/logo.png";
  return (
    <StyledLogo isDarkMode={isDarkMode}>
      <Img src={src} alt="Logo" />
      <p>Chyanit&apos;s Resort</p>
    </StyledLogo>
  );
}

export default Logo;
