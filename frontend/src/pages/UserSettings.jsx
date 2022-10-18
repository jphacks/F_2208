import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../api/auth";

const UserSettings = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    auth(navigate);
  }, []);

  return <>User Settings Page</>;
};

export default UserSettings;
