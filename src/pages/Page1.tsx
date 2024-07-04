import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  phno: string;
  email: string;
}

const Page1: React.FC = () => {
  const location = useLocation();
  const message: string | undefined = location.state?.message;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phno: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Cancel the event to prevent the browser prompt
      event.preventDefault();
      // Navigate to current location to ensure any state changes are discarded
      navigate(location.pathname, { replace: true });
    };

    // Add event listener when component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up: remove event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, location.pathname]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1); // For testing purposes

    navigate("/page2");
  };

  return (
    <div className="flex flex-col gap-2 bg-slate-100 h-dvh text-center justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <label htmlFor="name">Enter your Name:</label>
          <input
            type="text"
            value={formData.name}
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="email">Enter your Email:</label>
          <input
            type="text"
            value={formData.email}
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="phno">Enter your Phno:</label>
          <input
            type="text"
            value={formData.phno}
            id="phno"
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {message && <h1 className="text-red-700 text-md ">{message}</h1>}
    </div>
  );
};

export default Page1;
