import { Container } from "@mui/material";
import { css } from "@emotion/react";

const ShadowBox = ({ bgColor = "#fff", children }) => {
  return (
    <Container
      css={css`
        background-color: ${bgColor};
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 15px;
        max-width: 90%;
        @media screen and (min-width: 600px) {
          max-width: 600px;
        }
      `}
    >
      {children}
    </Container>
  );
};

export default ShadowBox;
