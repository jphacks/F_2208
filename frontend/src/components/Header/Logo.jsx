import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";

const Logo = () => {
  const { user } = useContext(userContext);
  return (
    <Typography
      variant="h6"
      color="inherit"
      component="h1"
      css={css`
        flex-grow: 1;
      `}
    >
      <Link
        id="logo"
        to={user != undefined ? "/dashboard" : "/"}
        css={css`
          text-decoration: none;
          color: inherit;
        `}
      >
        貯Pay箱
      </Link>
    </Typography>
  );
};

export default Logo;
