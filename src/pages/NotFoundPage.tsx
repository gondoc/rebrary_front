import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFoundPage = () => {
  const naviagation = useNavigate();

  useEffect(() => {
    naviagation("/main");
  }, []);

  return null;
};

export default NotFoundPage;
