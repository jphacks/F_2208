import { Stack, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { ShowTasks } from "../components/Task/ShowTasks";
import { css } from "@emotion/react";

import Point from "../components/Point";

const Dashboard = () => {
  return (
    <Layout
      css={css`
        display: flex;
        flex-direction: row;
        text-align: center;
      `}
    >
      <Typography
        variant="h4"
        element="h1"
        align="center"
        css={css`
          margin-bottom: 30px;
        `}
      >
        おかえりなさい
      </Typography>
      <ShowTasks limited={5} showMore hideDoneTask />
      <Point />
    </Layout>
  );
};

export default Dashboard;
