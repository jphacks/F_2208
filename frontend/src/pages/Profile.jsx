import {
  Button,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
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
import { fetchUser, updateUser } from "../api/user";
import QRCode from "../components/QRCode/QRCode";

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
  const [reload, setReload] = useState(false);
  const { userId } = useParams();
  const { user, setUser } = useContext(userContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paypay, setPaypay] = useState({});
  const [paypayModalOpen, setPaypayModalOpen] = useState(false);
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const payment = searchParams.get("payment");
    const merchantPaymentId = searchParams.get("merchant_payment_id");

    // URLからパラメタを削除する
    searchParams.delete("payment");
    searchParams.delete("merchant_payment_id");
    setSearchParams(searchParams);

    (async () => {
      if (payment === "paypay" && !!merchantPaymentId) {
        const res = await paypayPaymentDetails(merchantPaymentId);
        if (res.status === 200) {
          setPaypay(res.data);
          setPaypayModalOpen(true);
          const currentUser = await fetchUser();
          const newUser = await updateUser({
            balance_exp: currentUser.data.balance_exp + res.data.amount.amount,
          });
          setUser(newUser.data);
        }
      }
    })();
  }, []);
  console.log(user);
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
    setReload(!reload);
  };

  // ローカルストレージ内のコードを取り出し、ステートで管理する
  useEffect(() => {
    fetchCodes();
    console.log(codes);
  }, []);

  const fetchCodes = () => {
    const localStorageCodes = JSON.parse(
      localStorage.getItem("codes") || "[{}]"
    );
    console.log("localStorageCodes");
    setCodes([...localStorageCodes]);
  };

  if (user) {
    return (
      <Layout>
        <Box
          css={css`
            min-width: 80%;
          `}
        >
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <QRCode />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5" component="h2" align="center">
                {user.name}
              </Typography>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Pig
            pigImage={pigImage}
            grassImage={grassImage}
            jump={!paypayModalOpen} // Safariで豚がモーダルに重なる不具合への対策
          />
          <SpeechBubbleTop>
            ぼくの中には{user.point}ポイント入っているっぴ！
          </SpeechBubbleTop>
          <Box
            css={css`
              margin-top: 30px;
            `}
          >
            <UserStatus />
            <Button
              css={css`
                color: #ff0d72;
                border-color: #ff0d72;
                &:hover {
                  background-color: transparent;
                  color: #ff0d72;
                  opacity: 0.8;
                  border-color: #ff0d72;
                }
              `}
              onClick={() => handleClickPayPay(1)}
            >
              PayPayで支払う
            </Button>
          </Box>
          <StoreMoney
            handleReload={handleReload}
            codes={codes}
            setCodes={setCodes}
          />
          <WithdrawMoney
            handleReload={handleReload}
            reload={reload}
            codes={codes}
            setCodes={setCodes}
          />
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
        </Box>
      </Layout>
    );
  }
};

export default Profile;
