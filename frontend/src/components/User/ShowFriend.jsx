import { Avatar, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PigImage from "../../assets/img/pig.png";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { fetchFriends, updateFriend } from "../../api/friend";
import { css } from "@emotion/react";

export const ShowFriend = ({ friend, setFriends }) => {
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(friend.favorite);
  });

  const handleClick = async () => {
    setFavorite(!favorite);

    const res = await updateFriend({
      friend_id: friend.user.id,
      favorite: !favorite,
    });
    if (res.status === 200) {
      const newFriends = await fetchFriends();
      setFriends(newFriends.data);
    }
  };

  return (
    <Grid
      container
      css={css`
        padding: 1em;
        border-radius: 1em;
      `}
      key={friend.user.email}
    >
      <Grid item xs={2}>
        <Avatar src={PigImage} />
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={0.5}>
          <Typography>{friend.user.name}</Typography>
          <Typography variant="">{friend.user.email}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={handleClick}>
          {favorite ? <Favorite color={"error"} /> : <FavoriteBorder />}
        </IconButton>
      </Grid>
    </Grid>
  );
};
