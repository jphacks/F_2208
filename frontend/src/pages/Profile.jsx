import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { css } from "@emotion/react";
import pigImage from "../assets/img/pig.png";
import grassImage from "../assets/img/grass.png";
import paypayImage from "../assets/img/paypay.png";
import { userContext } from "../contexts/userContext";
import { paypayPay, paypayPaymentDetails } from "../api/paypay";
import CloseIcon from "@mui/icons-material/Close";
import SpeechBubbleTop from "../components/User/SpeechBubbleTop";
import Layout from "../components/Layout";
import Pig from "../components/User/Pig";
import UserStatus from "../components/User/UserStatus";
import { StoreMoney } from "../components/Forms/StoreMoney";
import { WithdrawMoney } from "../components/Forms/WithdrawMoney";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  // maxWidth: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
const closeButtonStyle = {
  height: 0,
  textAlign: "right",
  marginBottom: "15px",
};

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paypay, setPaypay] = useState({});
  const [paypayModalOpen, setPaypayModalOpen] = useState(false);

  useEffect(() => {
    const payment = searchParams.get("payment");
    const merchantPaymentId = searchParams.get("merchant_payment_id");
    // searchParams.delete("payment");
    // searchParams.delete("merchant_payment_id");
    // setSearchParams(searchParams);

    (async () => {
      if (payment === "paypay" && !!merchantPaymentId) {
        const res = await paypayPaymentDetails(merchantPaymentId);
        if (res.status === 200) {
          setPaypay(res.data);
          setPaypayModalOpen(true);
        }
      }
    })();
  }, []);


  const [reload, setReload] = useState(false);
  const { userId } = useParams();
  const { user } = useContext(userContext);

  const handleClickPayPay = async (amount) => {
    const res = await paypayPay(amount);
    console.log(res);
    // PayPayアプリを起動
    window.location.href = res.data.deeplink;
    // PayPayアプリを起動できない場合
    window.location.href = res.data.url;
  };

  const handleClosePayPayModal = () => {
    setPaypayModalOpen(false);
  };

  const navigate = useNavigate();

  // 本人のみがアクセスできる
  if (!!user && user.id != userId) {
    navigate("/dashboard");
  }
  const handleReload = () => {
    setReload(! reload);
  };

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
        <Pig pigImage={pigImage} grassImage={grassImage} jump={true} />
        <SpeechBubbleTop>
          ぼくの中には{user.total_exp}ポイント入っているっぴ！
          {user.total_exp ? "がんばったっぴね！" : "がんばれっぴ！"}
        </SpeechBubbleTop>
        <Box
          css={css`
            margin-top: 30px;
          `}
        >
          <UserStatus />
          <Button onClick={() => handleClickPayPay(1)}>PayPayで支払う</Button>
        </Box>
        <StoreMoney handleReload={handleReload}/>
          <WithdrawMoney handleReload={handleReload} reload={reload}/>
        {paypayModalOpen && (
          <Modal open={paypayModalOpen} onClose={handleClosePayPayModal}>
            <Box
              sx={style}
              css={css`
                background-color: #fff;
                border: none;
              `}
            >
              <Box sx={closeButtonStyle}>
                <IconButton onClick={handleClosePayPayModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box
                css={css`
                  max-width: 100%;
                `}
              >
                <img
                  src={paypayImage}
                  css={css`
                    max-width: 100%;
                  `}
                />
              </Box>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                css={css`
                  margin-bottom: 1em;
                `}
              >
                入金が完了しました
              </Typography>
              <Typography variant="h2" component="p" align="center">
                {paypay.amount.amount.toLocaleString()}
                <span
                  css={css`
                    font-size: 0.5em;
                  `}
                >
                  円
                </span>
              </Typography>
            </Box>
          </Modal>
        )}
      </Container>
    );
  }
};

export default Profile;
