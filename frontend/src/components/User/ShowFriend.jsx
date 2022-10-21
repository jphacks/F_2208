import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PigImage from "../../assets/img/pig.png";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { updateFriend } from "../../api/friend";

export const ShowFriend = ({ index, friend }) => {
  const [favo, setFavo] = useState(false);
  useEffect(() => {
    setFavo(friend.favorite);
  },[]); 

  useEffect(() => {
    (async () => {
      const user_id = friend.user_id;
      const intimacy = friend.intimacy;
      const sent_exp = friend.sent_exp;
      const received_exp = friend.received_exp;
      const favorite = favo;
      const res = await updateFriend({user_id, intimacy, favorite, sent_exp, received_exp});
    });

  }, [favo]);

  const handleClick = () => {
    if (favo === false) {
      setFavo(true);
    } else {
      setFavo(false);
    }
    console.log(favo);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            onClick={handleClick}
          >
            {favo ? <Favorite color={"secondary"} /> : <FavoriteBorder />}
          </IconButton>
        }
      />
      <ListItemAvatar>
        <Avatar
          src={PigImage}
        />
      </ListItemAvatar>
      <ListItemText primary={`おともだち${index}: ${friend.user.name}`} secondary={`email: ${friend.user.email}`} />
      <ListItem />
      <Divider />
      {console.log(friend)}
    </>
  );
};