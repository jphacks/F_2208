import { css } from "@emotion/react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import CloseIcon from "@mui/icons-material/Close";
import QRCodeReader from "./QRCodeReader";
import { createFriend } from "../../api/friend";
import { default as ReactQRCode } from "react-qr-code";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";

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
};

const QRCode = ({ fontSize = 60, color = "#444", open, setOpen }) => {
  const { user, setUser } = useContext(userContext);
  const [QRCodes, setQRCodes] = useState([]);
  const [friend, setFriend] = useState({});
  const [showMyQRCode, setShowMyQRCode] = useState(false);

  useEffect(() => {
    (async () => {
      const data = JSON.parse(QRCodes[0] || "{}");
      const user_id = data.user_id;
      const name = data.name;
      const email = data.email;
      if (user_id === user.id) {
        alert("自分以外のQRコードをスキャンしてください");
        return;
      }
      setFriend({ user_id, name, email });
    })();
  }, [QRCodes]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };

  const handleReadQRCode = (result) => {
    setQRCodes((codes) => {
      // 最新のもの一つだけ取得する
      return [result.getText()];
      // return [result.getText(), ...codes];
    });
  };

  const handleClickAddFriend = async () => {
    const res = await createFriend({ friend_id: friend.user_id });
    console.log(res);
    if (res.status === 200) {
      alert("フレンドを追加しました");
    } else {
      alert("フレンドの追加に失敗しました");
    }
  };

  return (
    <>
      <QrCodeScannerIcon
        sx={{ fontSize, color }}
        onClick={handleClick}
        css={css`
          &:hover {
            cursor: pointer;
          }
        `}
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          css={css`
            background-color: #fff;
            border: none;
          `}
        >
          <Box
            sx={closeButtonStyle}
            css={css`
              margin-bottom: 0.5em;
            `}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack spacing={3}>
            {showMyQRCode ? (
              <>
                <Typography variant="h6">マイQRコード</Typography>
                <Box
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <ReactQRCode
                    value={JSON.stringify({
                      user_id: user.id,
                      name: user.name,
                      email: user.email,
                    })}
                    fgColor="#D21363"
                  />
                </Box>
                <Box
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <Button
                    onClick={() => {
                      setShowMyQRCode(false);
                    }}
                    variant="outlined"
                    css={css`
                      color: #ff0d72;
                      border-color: #ff0d72;
                      &:hover {
                        color: #ff0d72;
                        opacity: 0.8;
                        border-color: #ff0d72;
                      }
                    `}
                  >
                    フレンドを追加する
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6">フレンドを追加する</Typography>
                {!QRCodes.length ? (
                  <QRCodeReader
                    onReadQRCode={(result) => handleReadQRCode(result)}
                  />
                ) : (
                  <Card sx={{ boxShadow: 3 }}>
                    <Grid container alignItems="center">
                      <Grid item xs={9}>
                        <CardContent>
                          <Stack spacing={1.5}>
                            <Typography variant="h5" element="p">
                              {friend.name}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <EmailIcon
                                css={css`
                                  color: #444;
                                `}
                              />
                              <Typography>{friend.email}</Typography>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Grid>
                      <Grid item xs={3}>
                        <Button onClick={handleClickAddFriend}>
                          <AddIcon
                            css={css`
                              font-size: 3em;
                              color: #444;
                            `}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                <Box
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <Button
                    onClick={() => {
                      setShowMyQRCode(true);
                    }}
                    variant="outlined"
                    css={css`
                      color: #ff0d72;
                      border-color: #ff0d72;
                    `}
                  >
                    マイQRコードを表示する
                  </Button>
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default QRCode;
