import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
import { ShowTasks } from "../components/ShowTasks";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth(navigate);
  }, []);


  return (
    <>

      <ShowTasks limited={true} />

    </>);
};


export default Dashboard;