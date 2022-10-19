import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
import { AddTaskModal } from "../components/AddTaskModal";
import Layout from "../components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth(navigate);
  }, []);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Layout>
      <Button variant="contained" color="primary" onClick={handleClick}>
        AddTaskModal
      </Button>
      <AddTaskModal open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default Dashboard;
