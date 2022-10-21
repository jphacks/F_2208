import { Box } from "@mui/material";
import { css } from "@emotion/react";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";

const Pig = ({
  pigImage,
  grassImage = null,
  jump = false,
  onClick = () => {},
}) => {
  const { user } = useContext(userContext);
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
            `animation: poyooon 1s linear 0s 1 ;
              animation-iteration-count: infinite;`}

            /* ${jump &&
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
            }`} */
            @keyframes poyooon {
              0% {
                transform: scale(1, 1) translate(0%, 0%);
              }
              10% {
                transform: scale(1.1, 0.9) translate(0%, 5%);
              }
              40% {
                transform: scale(1.2, 0.8) translate(0%, 15%);
              }
              50% {
                transform: scale(1, 1) translate(0%, 0%);
              }
              60% {
                transform: scale(0.9, 1.2)
                  translate(
                    0%,
                    ${(user.point < 500 && "-25%") ||
                    (user.point < 1000 && "-20%") ||
                    (user.point < 1500 && "-15%") ||
                    (user.point < 3000 && "-10%") ||
                    (user.point < 5000 && "-5%")}
                  );
              }

              75% {
                transform: scale(0.9, 1.2) translate(0%, -5%);
              }
              85% {
                transform: scale(1.2, 0.8) translate(0%, 10%);
              }
              100% {
                transform: scale(1, 1) translate(0%, 0%);
              }
            }
          `}
          onClick={onClick}
        />
      </Box>
    </Box>
  );
};

export default Pig;
