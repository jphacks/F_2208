import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const SpeechBubbleTop = ({ children }) => {
  return (
    <Box
      css={css`
        text-align: center;
      `}
    >
      <div
        css={css`
          position: relative;
          display: inline-block;
          padding: 12px 15px;
          width: 80%;
          color: #555;
          font-size: 16px;
          background: #ffeded;
          border: solid 3px #eb6e9f;
          box-sizing: border-box;
          border-radius: 5px;
          @media screen and (min-width: 768px) {
            max-width: 600px;
          }
          &::before {
            content: "";
            position: absolute;
            top: -24px;
            left: 50%;
            margin-left: -15px;
            border: 12px solid transparent;
            border-bottom: 12px solid #ffeded;
            z-index: 2;
          }
          &::after {
            content: "";
            position: absolute;
            top: -30px;
            left: 50%;
            margin-left: -17px;
            border: 14px solid transparent;
            border-bottom: 14px solid #eb6e9f;
            z-index: 1;
          }
          & p {
            margin: 0;
            padding: 0;
            margin: 0 auto;
            text-align: left;
          }
        `}
      >
        <Typography>{children}</Typography>
      </div>
    </Box>
  );
};

export default SpeechBubbleTop;
