import { useContext } from "react";
import { userContext } from "../contexts/userContext";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import ExpBar from "./ExpBar";

const LevelExpBar = () => {
  const { user } = useContext(userContext);

  return (
    <>
      <div
        css={css`
          display: flex;
          gap: 0.8em;
          justify-content: start;
          align-items: baseline;
          margin-bottom: 0.2em;
        `}
      >
        <Typography variant="h4" color="inherit">
          Lv. {user.level}
        </Typography>
        <div
          css={css`
            font-size: 0.9em;
            font-weight: bold;
          `}
        >
          あと {200 - (user.total_exp % 200)}{" "}
          <span
            css={css`
              font-size: 0.6em;
            `}
          >
            Exp
          </span>
          でレベルアップ
        </div>
      </div>
      <ExpBar exp={user.total_exp} height="10px"></ExpBar>
    </>
  );
};

export default LevelExpBar;
