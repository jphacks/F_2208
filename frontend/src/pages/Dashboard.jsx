import { Typography } from "@mui/material";
import Layout from "../components/Layout";
import { ShowTasks } from "../components/Task/ShowTasks";
import { css } from "@emotion/react";

const Dashboard = () => {
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
        おかえりなさい
      </Typography>
      <ShowTasks limited={5} showMore hideDoneTask />
    </Layout>
  );
};

export default Dashboard;
