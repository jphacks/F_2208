import { useContext } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { Container } from "@mui/system";
import { userContext } from "../contexts/userContext";
import SettingForm from "../components/SettingForm";
import DeleteForm from "../components/DeleteForm";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

const UserSettings = () => {
  const { user } = useContext(userContext);

  if (user) {
    return (
      <Container
        maxWidth="md"
        css={css`
          padding-top: 30px;
          margin-bottom: 100px;
        `}
      >
        <Typography variant="h4" element="h1" align="center">
          設定
        </Typography>
        <Stack spacing={2}>
          <SettingForm />
          <Divider />
          <UpdatePasswordForm />
          <Divider />
          <DeleteForm />
        </Stack>
      </Container>
    );
  }
};

export default UserSettings;
