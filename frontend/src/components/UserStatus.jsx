import { useContext } from "react";
import { userContext } from "../contexts/userContext";
import { css } from "@emotion/react";
import { Box, Stack } from "@mui/material";
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
    >
      <LevelExpBar />
    </Stack>
  );
};

export default UserStatus;
