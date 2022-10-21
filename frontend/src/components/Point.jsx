import ShadowBox from "../components/ShadowBox";
import RewardBg from "../assets/img/RewardBg.png";
import { css } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { userContext } from "../contexts/userContext";

const Point = () => {
  const { user, setUser } = useContext(userContext);

  return (
    <ShadowBox bgColor="#ffffee">
      <Box
        css={css`
          height: 350px;
          margin-top: 30px;
          background-image: url(${RewardBg});
          background-position: 50% 50%;
          background-color: rgba(255, 255, 255, 0.2);
          background-blend-mode: lighten;
          background-size: 120%;
          background-repeat: none;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          @media screen and (max-width: 600px) {
            background-size: 85vw;
          }
        `}
      >
        <Stack
          spacing={2}
          css={css`
            text-align: center;
          `}
        >
          <Typography
            variant="h5"
            css={css`
              letter-spacing: 0.01em;
            `}
          >
            トータルEXP
          </Typography>
          <Stack spacing={0.5}>
            <Typography
              variant="h3"
              css={css`
                color: #f00;
                letter-spacing: 0.01em;
              `}
            >
              {user?.balance_exp}
            </Typography>
            <Typography variant="h4">Exp</Typography>
          </Stack>
          <Typography variant="h6">
            {3000 - user?.balance_exp > 0 ? (
              <>
                ギフト券3,000円まで<br></br>あと {3000 - user?.balance_exp}pt!!
              </>
            ) : (
              <>
                すごい！
                <br />
                この調子で頑張ろう！
              </>
            )}
          </Typography>
        </Stack>
      </Box>
    </ShadowBox>
  );
};

export default Point;
