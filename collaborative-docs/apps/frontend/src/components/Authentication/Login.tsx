import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as apiLogin } from "../../Utils/api"; 
import animation from '../../assets/images/730_generated.jpg';
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);
    
    try {
      const userData = { email, password };
      const response = await apiLogin(userData);
      if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem("authToken", token); 

        console.log("Login successful, navigating to home page...");
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="login-page">
      <div className="login-image">
        <img src={animation} alt="Login illustration" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p className="account">
            Don't have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
