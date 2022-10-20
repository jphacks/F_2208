import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

const UserBadge = () => {
  const { user } = useContext(userContext);

  return (
    <>
      <Typography variant="h6">バッジ</Typography>
    </>
  );
};

export default UserBadge;
