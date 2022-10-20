import { useContext, useState } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { userContext } from "../../contexts/userContext";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import logout from "../../api/logout";
import PigImage from "../../assets/img/pig.png";
import ExpBar from "../User/ExpBar";

const UserMenu = () => {
  const { user } = useContext(userContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    {
      title: "プロフィール",
      link: user && `/users/${user.id}`,
      icon: <PersonIcon />,
    },
    {
      title: "フレンド",
      link: `/friends`,
      icon: <GroupIcon />,
    },
    {
      title: "設定",
      link: user && `/users/settings`,
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
    <>
      {user != undefined && (
        <div
          css={css`
            display: flex;
            gap: 0.4em;
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
            <div
              css={css`
                font-size: 0.7em;
              `}
            >
              Lv.{user.level}
            </div>
            <ExpBar exp={user.total_exp} width="30px" />
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
      )}
    </>
  );
};

export default UserMenu;
