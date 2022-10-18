import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import RedeemIcon from "@mui/icons-material/Redeem";
import GroupIcon from "@mui/icons-material/Group";
import { useContext, useState } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import logout from "../api/logout";
import PigImage from "../assets/img/pig.png";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useContext(userContext);

  const menuItems = [
    {
      title: "プロフィール",
      link: user && `users/${user.id}`,
      icon: <PersonIcon />,
    },
    {
      title: "フレンド",
      link: `friends`,
      icon: <GroupIcon />,
    },
    {
      title: "ポイント交換",
      link: `points`,
      icon: <RedeemIcon />,
    },
    {
      title: "設定",
      link: `settings`,
      icon: <SettingsIcon />,
    },
    {
      title: "ログアウト",
      link: null,
      icon: <LogoutIcon />,
      onClick: logout,
    },
  ];

  const handleChange = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      css={css`
        background-color: #ffefef;
        color: #000;
      `}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          component="h1"
          css={css`
            flex-grow: 1;
          `}
        >
          <Link
            to="/"
            css={css`
              text-decoration: none;
              color: inherit;
            `}
          >
            貯Pay箱
          </Link>
        </Typography>

        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 0.2em;
            `}
          >
            {user?.level && (
              <div
                css={css`
                  font-size: 0.7em;
                `}
              >
                `Lv.${user.level}`
              </div>
            )}
            {user?.total_exp && (
              <div
                css={css`
                  width: 30px;
                  height: 4px;
                  background-color: #dedede;
                  &::after {
                    content: "";
                    display: block;
                    /* 1Lvあたり200Exp必要の場合の計算式 */
                    width: ${Math.ceil(((350 % 200) / 200) * 30)}px;
                    height: 4px;
                    background-color: #e83743;
                  }
                `}
              ></div>
            )}
          </div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="header-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
            css={css`
              width: 50px;
              height: 50px;
            `}
          >
            <img
              src={PigImage}
              css={css`
                width: 50px;
                height: 50px;
                border-radius: 99999px;
                object-fit: cover;
              `}
            />
          </IconButton>
          <Menu
            id="header-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            css={css`
              margin-top: 45px;
            `}
          >
            <MenuList>
              {menuItems.map(({ title, link, icon, onClick }) => (
                <Link
                  to={link}
                  onClick={onClick || handleChange}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <MenuItem key={title}>
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                        gap: 0.3em;
                      `}
                    >
                      {icon}
                      <Typography>{title}</Typography>
                    </div>
                  </MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
