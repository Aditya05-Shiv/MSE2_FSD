import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function RegisterPage() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/register", formData);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-shell auth-shell">
      <AuthForm
        title="Create your campus account"
        subtitle="Register once, then report and manage lost or found items securely."
        fields={[
          { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
          { name: "email", label: "Email", type: "email", placeholder: "student@college.edu" },
          { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
        ]}
        values={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Register"
        error={error}
        footer={
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        }
      />
    </div>
  );
}

export default RegisterPage;
