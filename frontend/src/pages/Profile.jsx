import {
  Button,
  Divider,
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
  const { userId } = useParams();
  const { user, setUser } = useContext(userContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paypay, setPaypay] = useState({});
  const [paypayModalOpen, setPaypayModalOpen] = useState(false);
  const [codes, setCodes] = useState([]);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [openQRCode, setOpenQRCode] = useState(false);

  const handleClickStore = () => {
    setOpenStore(true);
  };
  const handleCloseStore = () => {
    setOpenStore(false);
  };

  //モーダルの操作
  const handleClickWithdraw = () => {
    setOpenWithdraw(true);
  };
  const handleCloseWithdraw = () => {
    setOpenWithdraw(false);
  };

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
            point: currentUser.data.point + res.data.amount.amount,
          });
          setUser(newUser.data);
        }
      }
    })();
  }, []);
  // console.log(user);
  const handleClickPayPay = async (amount) => {
    const res = await paypayPay(amount);
    // console.log(res);
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

  // ローカルストレージ内のコードを取り出し、ステートで管理する
  useEffect(() => {
    fetchCodes();
    // console.log(codes);
  }, []);

  const fetchCodes = () => {
    const localStorageCodes = JSON.parse(
      localStorage.getItem("codes") || "[{}]"
    );
    // console.log("localStorageCodes");
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
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Typography variant="h5" component="h2" align="center">
                {user.name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <QRCode open={openQRCode} setOpen={setOpenQRCode} />
            </Grid>
          </Grid>
          <Pig
            pigImage={pigImage}
            grassImage={grassImage}
            // jump={
            //   !openQRCode && !paypayModalOpen && !openWithdraw && !openStore
            // } // Safariで豚がモーダルに重なる不具合への対策
            jump={true}
          />
          <SpeechBubbleTop>
            {(user.point <= 0 &&
              `ぼくの中には${user.point}
            円入っているっぴ！お腹すいたっぴ...`) ||
              (user.point < 500 &&
                `ぼくの中には${user.point}
            円入っているっぴ！大事にするっぴ！`) ||
              (user.point < 1000 &&
                `ぼくの中には${user.point}
            円入っているっぴ！${user.name}の努力の結晶だっぴ...！`) ||
              (user.point < 1500 &&
                `ぼくの中には${user.point}
            円入っているっぴ！まだまだ入るっぴ！`) ||
              (user.point < 3000 &&
                `ぼくの中には${user.point}
            円入っているっぴ！結構溜まったっぴね！`) ||
              (user.point < 5000 &&
                `ぼくの中には${user.point}
            円入っているっぴ！焼肉行くっぴ！`) ||
              (user.point < 10000 &&
                `ぼくの中には${user.point}
            円入っているっぴ！と、飛べないっぴ...！`) ||
              `ぼくの中には${user.point}
            円入っているっぴ！もう限界っぴ！`}
          </SpeechBubbleTop>

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

        <Box>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={openStore}
            onClose={handleCloseStore}
          >
            <Box
              sx={style}
              css={css`
                background-color: #fff;
                border: none;
              `}
            >
              <Box sx={closeButtonStyle}>
                <IconButton onClick={handleCloseStore}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Stack spacing={2}>
                <Typography variant="h6">入金</Typography>
                <Stack spacing={3}>
                  <StoreMoney codes={codes} setCodes={setCodes} />
                  <Divider />
                  <Button
                    css={css`
                      color: #fff;
                      background-color: #f67690;
                      &:hover {
                        color: #fff;
                        background-color: #dc8ba7;
                        opacity: 0.8;
                        border-color: #ff0d72;
                      }
                    `}
                    variant="contained"
                    onClick={() => handleClickPayPay(1)}
                  >
                    PayPayで入金する
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Modal>
        </Box>

        <Box>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={openWithdraw}
            onClose={handleCloseWithdraw}
          >
            <Box
              sx={style}
              css={css`
                background-color: #fff;
                border: none;
              `}
            >
              <Box sx={closeButtonStyle}>
                <IconButton onClick={handleCloseWithdraw}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Stack spacing={3}>
                <Typography variant="h6">出金</Typography>
                <WithdrawMoney codes={codes} setCodes={setCodes} />
              </Stack>
            </Box>
          </Modal>
          <Box
            css={css`
              margin-top: 30px;
            `}
          >
            <Grid container justifyContent="center">
              <Grid
                item
                xs={4}
                css={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <Button
                  css={css`
                    color: #fff;
                    background-color: #f67690;
                    padding: 2em;
                    @media screen and (min-width: 768px) {
                      padding: 3em;
                    }
                    &:hover {
                      background-color: #dc8ba7;
                      opacity: 0.8;
                      border-color: #ff0d72;
                    }
                  `}
                  onClick={handleClickStore}
                  variant="contained"
                >
                  <Typography variant="h5">入金</Typography>
                </Button>
              </Grid>
              <Grid
                item
                xs={4}
                css={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <Button
                  css={css`
                    color: #fff;
                    background-color: #76b9f6;
                    padding: 2em;
                    @media screen and (min-width: 768px) {
                      padding: 3em;
                    }
                    &:hover {
                      color: #fff;
                      background-color: #76b9f6;
                      opacity: 0.8;
                      border-color: #378fe0;
                    }
                  `}
                  onClick={handleClickWithdraw}
                  variant="contained"
                >
                  <Typography variant="h5">出金</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            css={css`
              margin-top: 1em;
            `}
          >
            <UserStatus />
          </Box>
        </Box>
      </Layout>
    );
  }
};

export default Profile;
