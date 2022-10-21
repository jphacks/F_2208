import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { css } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import LevelExpBar from "./LevelExpBar";

const UserStatus = () => {
  const { user } = useContext(userContext);

  return (
    <Stack
      maxWidth="md"
      css={css`
        background-color: #fffbd8;
        padding: 1em 1.3em;
        margin: 0 auto;
      `}
      spacing={2}
    >
      <LevelExpBar />
      <Box>
        <Typography variant="h6" color="inherit">
          トータルEXP
        </Typography>
        <Stack
          direction="row"
          alignItems="baseline"
          spacing={1.5}
          justifyContent="end"
          css={css`
            padding-right: 20px;
          `}
        >
          <Typography variant="h4">
            {user.total_exp.toLocaleString()}
          </Typography>
          <Typography variant="body1" color="inherit">
            EXP
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6" color="inherit">
          貯金ポイント
        </Typography>
        <Stack
          direction="row"
          alignItems="baseline"
          spacing={1.5}
          justifyContent="end"
          css={css`
            padding-right: 20px;
          `}
        >
          <Typography variant="h4">{user.point.toLocaleString()}</Typography>
          <Typography variant="body1" color="inherit">
            pt
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6" color="inherit">
          出金可能ポイント
        </Typography>
        <Stack
          direction="row"
          alignItems="baseline"
          spacing={1.5}
          justifyContent="end"
          css={css`
            padding-right: 20px;
          `}
        >
          <Typography variant="h4">
            {user.balance_exp.toLocaleString()}
          </Typography>
          <Typography variant="body1" color="inherit">
            pt
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default UserStatus;
