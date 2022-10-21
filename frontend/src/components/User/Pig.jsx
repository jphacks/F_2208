import { Box } from "@mui/material";
import { css } from "@emotion/react";

const Pig = ({
  pigImage,
  grassImage = null,
  jump = false,
  onClick = () => {},
}) => {
  return (
    <Box
      css={css`
        margin-top: 1rem;
        margin-bottom: 5px;
      `}
    >
      <Box
        css={css`
          text-align: center;
          max-width: 320px;
          margin: 0 auto;
          overflow: visible;
          padding-bottom: 15px;
          ${grassImage && `background-image: url(${grassImage})`};
          background-position: bottom 0 left 0;
          background-repeat: no-repeat;
          background-size: 100% auto;
          transform: translate3d(0, 0, 0);
        `}
      >
        <img
          src={pigImage}
          css={css`
            width: 300px;
            max-width: 85%;
            height: 300px;
            border-radius: 99999px;
            object-fit: cover;

            ${jump &&
            `// 子豚ジャンプアニメーション
            animation-name: jump;
            animation-duration: 0.3s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            animation-duration: 1.2s;
            @keyframes jump {
              0% {
                transform: translate(0%, 30px) rotateX(20deg);
              }
              100% {
                transform: translate(0%, 0%);
              }
            }`}
          `}
          onClick={onClick}
        />
      </Box>
    </Box>
  );
};

export default Pig;
