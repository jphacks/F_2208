import { AppBar, Toolbar } from "@mui/material";
import { css } from "@emotion/react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      css={css`
        background-color: #ffefef;
        color: #000;
      `}
    >
      <Toolbar>
        <Logo />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
