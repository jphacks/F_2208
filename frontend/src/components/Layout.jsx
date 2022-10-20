import { css } from "@emotion/react";
import bgPigImage from "../assets/img/bg-pig.png";

const Layout = ({ children }) => {
  return (
    <main
      css={css`
        background-color: #fffcfc;
        background-image: url(${bgPigImage});
        background-size: 100px;
        margin: 0;
        display: flex;
        min-height: 100vh;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        padding-top: 30px;
      `}
    >
      {children}
    </main>
  );
};

export default Layout;
