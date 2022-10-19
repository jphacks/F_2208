import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
import { ShowTasks } from "../components/ShowTasks";

const Tasks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth(navigate);
  }, []);


  return (
    <>

      <ShowTasks />

    </>);
};

export default Tasks;