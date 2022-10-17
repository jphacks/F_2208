import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";

const Tasks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth(navigate);
  }, []);

  return <>Tasks Page</>;
};

export default Tasks;
