import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import pigImage from "../assets/img/pig.png";
import grassImage from "../assets/img/grass.png";
import { userContext } from "../contexts/userContext";
import SpeechBubbleTop from "../components/User/SpeechBubbleTop";
import Layout from "../components/Layout";
import Pig from "../components/User/Pig";
import UserStatus from "../components/User/UserStatus";
import { StoreMoney } from "../components/Forms/StoreMoney";
import { WithdrawMoney } from "../components/Forms/WithdrawMoney";

const Profile = () => {
  const [reload, setReload] = useState(false);
  const { userId } = useParams();
  const { user } = useContext(userContext);

  const navigate = useNavigate();

  // 本人のみがアクセスできる
  if (!!user && user.id != userId) {
    navigate("/dashboard");
  }
  const handleReload = () => {
    setReload(! reload);
  };

  return (
    <>
    <Layout>
      {user && (
        <Container maxWidth="lg">
          <Typography variant="h5" component="h2" align="center">
            {user.name}
          </Typography>
          <Pig
            pigImage={pigImage}
            grassImage={grassImage}
            jump={true}
            onClick={() => alert(user.name)}
          />
          <SpeechBubbleTop>
            ぼくの中には{user.balance_exp}ポイント入っているっぴ！
            {user.total_exp ? "がんばったっぴね！" : "がんばれっぴ！"}
          </SpeechBubbleTop>
          <Box
            css={css`
              margin-top: 30px;
            `}
          >
            <UserStatus />
          </Box>
          <StoreMoney handleReload={handleReload}/>
          <WithdrawMoney handleReload={handleReload} reload={reload}/>
        </Container>
      )}
    </Layout>
    
    </>
  );
};

export default Profile;
