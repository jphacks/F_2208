import { Avatar, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PigImage from "../../assets/img/pig.png";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { fetchFriends, updateFriend } from "../../api/friend";
import { css } from "@emotion/react";
import { userContext } from "../../contexts/userContext";

export const ShowFriend = ({ friend, setFriends }) => {
  const [friendUser, setFriendUser] = useState();
  const { user, setUser } = useContext(userContext);
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(friend.favorite);
    // console.log(friend);
    if (friend?.user?.email && friend.user.email === user?.email) {
      setFriendUser(friend.friend);
    } else if (friend?.friend?.email && friend.friend.email === user?.email) {
      setFriendUser(friend.user);
    }

    // console.log(friendUser);
  }, [user]);

  const handleClick = async () => {
    setFavorite(!favorite);

    const res = await updateFriend({
      friend_id: friendUser.id,
      favorite: !favorite,
    });
    if (res.status === 200) {
      const newFriends = await fetchFriends();
      setFriends(newFriends.data);
    }
  };

  if (!!friendUser) {
    return (
      <Grid
        container
        css={css`
          padding: 1em;
          border-radius: 1em;
        `}
        key={friendUser.email}
      >
        <Grid item xs={2}>
          <Avatar src={PigImage} />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={0.5}>
            <Typography>{friendUser.name}</Typography>
            <Typography variant="">{friendUser.email}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handleClick}>
            {favorite ? <Favorite color={"error"} /> : <FavoriteBorder />}
          </IconButton>
        </Grid>
      </Grid>
    );
  }
};
