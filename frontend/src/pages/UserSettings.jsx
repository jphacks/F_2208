import { useContext } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { Container } from "@mui/system";
import { userContext } from "../contexts/userContext";
import SettingForm from "../components/Forms/SettingForm";
import UpdatePasswordForm from "../components/Forms/UpdatePasswordForm";
import DeleteForm from "../components/Forms/DeleteForm";
import Layout from "../components/Layout";

const UserSettings = () => {
  const { user } = useContext(userContext);

  return (
    <Layout>
      {user && (
        <Container
          maxWidth="md"
          css={css`
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
      )}
    </Layout>
  );
};

export default UserSettings;
