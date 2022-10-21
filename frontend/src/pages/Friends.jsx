import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { fetchFriends } from "../api/friend.js";
import { ShowFriend } from "../components/User/ShowFriend";

const Friends = () => {
  const [friends, setFriends] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetchFriends();
      setFriends(res.data);
    })();
  }, []);

  return (
    <Layout>
      <Typography
        variant="h4"
        element="h1"
        align="center"
        css={css`
          margin-bottom: 30px;
        `}
      >
        おともだち
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {!!friends ? Object.entries(friends).map(([key, friend]) => (
          <ShowFriend index={Number(key)+1} friend={friend} />

        )) : ""}
      </List>
    </Layout>
  );
};

export default Friends;