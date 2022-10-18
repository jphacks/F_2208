import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth(navigate);
  }, []);

  return <>Dashboard Page</>;
};

export default Dashboard;
