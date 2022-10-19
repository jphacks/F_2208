import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import pigImage from "../assets/img/pig.png";
import grassImage from "../assets/img/grass.png";
import { userContext } from "../contexts/userContext";
import SpeechBubbleTop from "../components/SpeechBubbleTop";
import Pig from "../components/Pig";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useContext(userContext);

  const navigate = useNavigate();

  // 本人のみがアクセスできる
  if (!!user && user.id != userId) {
    navigate("/dashboard");
  }

  if (user) {
    return (
      <Container
        maxWidth="lg"
        css={css`
          padding-top: 30px;
        `}
      >
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
          ぼくの中には{user.total_exp}ポイント入っているっぴ！
          {user.total_exp ? "がんばったっぴね！" : "がんばれっぴ！"}
        </SpeechBubbleTop>
      </Container>
    );
  }
};

export default Profile;
