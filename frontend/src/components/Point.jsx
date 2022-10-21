import ShadowBox from "../components/ShadowBox";
import RewardBg from "../assets/img/RewardBg.png";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { userContext } from "../contexts/userContext";

const Point = () => {
  const { user, setUser } = useContext(userContext);

  return (
    <ShadowBox>
      <Box
        css={css`
          height: 350px;
          /* padding-top: 1vw; */
          padding-bottom: 0vw;
          background-image: url(${RewardBg});
          background-position: 50% 50%;
          background-color: rgba(255, 255, 255, 0.2);
          background-blend-mode: lighten;
          background-size: 100%;
          @media screen and (max-width: 600px) {
            background-size: 80vw;
          }
          /* width: 100; */
          /* display: flex;
          align-items: center;
          flex-direction: column; */
        `}
      >
        <div
          css={css`
            padding-bottom: 10px;
            text-align: center;
          `}
        >
          <h1
            css={css`
              color: red;
              font-size: 60px;
              @media screen and (max-width: 600px) {
                font-size: 10vw;
                margin-bottom: 10px;
              }
            `}
          >
            {user?.balance_exp}
          </h1>
          <h1
            css={css`
              margin-top: 0;
              margin-bottom: 20px;
              font-size: 30px;
              @media screen and (max-width: 600px) {
                background-size: 8vw;
              }
            `}
          >
            pt
          </h1>
          <h3
            css={css`
              font-size: 1.5vw;
              @media screen and (min-width: 600px) {
                font-size: 15px;
                margin-bottom: 0;
              }
            `}
          >
            Amazonギフト券3,000円まで<br></br>あと150pt!!
          </h3>
        </div>
      </Box>
    </ShadowBox>
  );
};

export default Point;
