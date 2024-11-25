import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../Utils/api";
import animation from "../../assets/images/730_generated.jpg";
import "./RegisterForm.css";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await register(userData);

      if (response.status === 201) {
        setSuccessMessage("User registered successfully!");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        throw new Error("Failed to register user");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while registering the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="register-image">
        <img src={animation} alt="image" />
      </div>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h2>Register a New User</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
