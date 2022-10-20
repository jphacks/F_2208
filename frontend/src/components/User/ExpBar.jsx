import { css } from "@emotion/react";

const ExpBar = ({
  exp = 0,
  width = "100%",
  height = "4px",
  baseColor = "#dedede",
  expColor = "#FF5A5A",
}) => {
  const expPer = ((exp % 200) / 200) * 100;

  return (
    <div
      css={css`
        width: ${width};
        height: ${height};
        background-color: ${baseColor};
        border-radius: 5px;
        &::after {
          content: "";
          display: block;
          /* 1Lvあたり200Exp必要の場合の計算式 */
          width: ${expPer}%;
          height: ${height};
          background-color: ${expColor};
          border-radius: 5px;
        }
      `}
    ></div>
  );
};

export default ExpBar;
