import { Typography } from "@mui/material";
import { ShowTasks } from "../components/Task/ShowTasks";
import Layout from "../components/Layout";
import { css } from "@emotion/react";

const Tasks = () => {
  return (
    <Layout>
      <Typography
        variant="h4"
        element="h1"
        align="center"
        css={css`
          margin-bottom: 30px;
        `}
      >
        タスク一覧
      </Typography>
      <ShowTasks />
    </Layout>
  );
};

export default Tasks;
