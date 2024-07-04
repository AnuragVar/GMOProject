import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  phno: string;
  email: string;
}

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  const [formData] = useState<FormData | null>(() => {
    // Load the initial state from localStorage
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (
      formData == null ||
      formData.name === "" ||
      formData.email === "" ||
      formData.phno === ""
    ) {
      // Navigate to the home page with a message
      navigate("/", {
        state: { message: "Please fill out all required fields." },
      });
    }
  }, [formData, navigate]);

  if (
    formData == null ||
    formData.name === "" ||
    formData.email === "" ||
    formData.phno === ""
  ) {
    // Return null to avoid rendering anything if navigation happens
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
