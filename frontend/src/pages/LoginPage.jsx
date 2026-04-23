import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const initialState = {
  email: "",
  password: "",
};

function LoginPage() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/dashboard";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/login", formData);
      login(data);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-shell auth-shell">
      <AuthForm
        title="Welcome back"
        subtitle="Login to manage reported lost and found items from your dashboard."
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "student@college.edu" },
          { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
        ]}
        values={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Login"
        error={error}
        footer={
          <p>
            New user? <Link to="/register">Create an account</Link>
          </p>
        }
      />
    </div>
  );
}

export default LoginPage;
